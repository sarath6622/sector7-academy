"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { requireDb } from "@/lib/db";
import { Prisma, type FacultyRoleType } from "@/generated/prisma";

async function ensureStaff() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "STAFF") throw new Error("Unauthorised");
}

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const ALL_ROLES: FacultyRoleType[] = ["TUTOR", "ASSESSOR", "IQA", "AUTHOR"];

function revalidateFaculty(courseSlugs: string[]) {
  revalidatePath("/faculty");
  revalidatePath("/admin/faculty");
  for (const slug of courseSlugs) revalidatePath(`/courses/${slug}`);
}

const facultySchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(1),
  bio: z.string().min(1, "Bio is required"),
  photoUrl: z.string().default(""),
  roles: z.array(z.enum(["TUTOR", "ASSESSOR", "IQA", "AUTHOR"])),
  courseSlugs: z.array(z.string()),
  isPublished: z.boolean(),
  sortOrder: z.number().int(),
});

export type SaveState = { error?: string };

export async function saveFaculty(
  id: string | null,
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await ensureStaff();
  const get = (k: string) => (formData.get(k) as string | null)?.trim() ?? "";
  const name = get("name");

  const parsed = facultySchema.safeParse({
    name,
    slug: get("slug") ? slugify(get("slug")) : slugify(name),
    bio: get("bio"),
    photoUrl: get("photoUrl"),
    roles: (formData.getAll("roles") as string[]).filter((r) => ALL_ROLES.includes(r as FacultyRoleType)),
    courseSlugs: formData.getAll("courseSlugs") as string[],
    isPublished: formData.get("isPublished") === "on",
    sortOrder: Number(get("sortOrder")) || 0,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const d = parsed.data;

  const db = requireDb();
  const courses = await db.course.findMany({
    where: { slug: { in: d.courseSlugs } },
    select: { id: true, slug: true },
  });

  const data = {
    name: d.name,
    slug: d.slug,
    bio: d.bio,
    photoUrl: d.photoUrl || null,
    isPublished: d.isPublished,
    sortOrder: d.sortOrder,
  };

  try {
    const facultyId = id
      ? (await db.faculty.update({ where: { id }, data })).id
      : (await db.faculty.create({ data })).id;

    await db.facultyRole.deleteMany({ where: { facultyId } });
    await db.facultyRole.createMany({
      data: d.roles.map((role) => ({ facultyId, role })),
      skipDuplicates: true,
    });

    await db.courseFaculty.deleteMany({ where: { facultyId } });
    await db.courseFaculty.createMany({
      data: courses.map((c) => ({ facultyId, courseId: c.id })),
      skipDuplicates: true,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: `The slug "${d.slug}" is already in use.` };
    }
    console.error("[saveFaculty]", e);
    return { error: "Could not save. Please try again." };
  }

  revalidateFaculty(courses.map((c) => c.slug));
  redirect("/admin/faculty");
}

export async function togglePublishFaculty(id: string, next: boolean) {
  await ensureStaff();
  const db = requireDb();
  const f = await db.faculty.update({
    where: { id },
    data: { isPublished: next },
    include: { courses: { include: { course: { select: { slug: true } } } } },
  });
  revalidateFaculty(f.courses.map((c) => c.course.slug));
}

export async function deleteFaculty(id: string) {
  await ensureStaff();
  const db = requireDb();
  const f = await db.faculty.delete({
    where: { id },
    include: { courses: { include: { course: { select: { slug: true } } } } },
  });
  revalidateFaculty(f.courses.map((c) => c.course.slug));
  redirect("/admin/faculty");
}
