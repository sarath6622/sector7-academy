"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { requireDb } from "@/lib/db";
import { Prisma } from "@/generated/prisma";

async function ensureStaff() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "STAFF") throw new Error("Unauthorised");
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Revalidate every public surface that shows course data. */
function revalidateCourse(slug?: string) {
  revalidatePath("/");
  revalidatePath("/courses");
  revalidatePath("/apply");
  if (slug) revalidatePath(`/courses/${slug}`);
  revalidatePath("/admin/courses");
}

const courseSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(1),
  level: z.string().min(1, "Level is required"),
  levelLabel: z.string().default(""),
  category: z.enum(["certification", "nutrition"]),
  summary: z.string().min(1, "Summary is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().default(""),
  format: z.string().default(""),
  price: z.string().default(""),
  eligibility: z.string().default(""),
  certification: z.string().default(""),
  outcomes: z.array(z.string()),
  modules: z.array(z.object({ title: z.string().min(1), description: z.string().optional() })),
  featured: z.boolean(),
  isPublished: z.boolean(),
  sortOrder: z.number().int(),
});

function parseForm(formData: FormData) {
  const get = (k: string) => (formData.get(k) as string | null)?.trim() ?? "";
  const lines = (k: string) =>
    get(k)
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

  const title = get("title");
  const modules = lines("modules").map((line) => {
    const [t, ...rest] = line.split("|");
    return { title: t.trim(), description: rest.join("|").trim() || undefined };
  });

  return courseSchema.safeParse({
    title,
    slug: get("slug") ? slugify(get("slug")) : slugify(title),
    level: get("level"),
    levelLabel: get("levelLabel"),
    category: get("category"),
    summary: get("summary"),
    description: get("description"),
    duration: get("duration"),
    format: get("format"),
    price: get("price"),
    eligibility: get("eligibility"),
    certification: get("certification"),
    outcomes: lines("outcomes"),
    modules,
    featured: formData.get("featured") === "on",
    isPublished: formData.get("isPublished") === "on",
    sortOrder: Number(get("sortOrder")) || 0,
  });
}

export type SaveState = { error?: string };

export async function saveCourse(
  id: string | null,
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await ensureStaff();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }
  const db = requireDb();
  const d = parsed.data;

  const data = {
    title: d.title,
    slug: d.slug,
    level: d.level,
    levelLabel: d.levelLabel,
    category: d.category,
    summary: d.summary,
    description: d.description,
    duration: d.duration || null,
    format: d.format || null,
    price: d.price || null,
    eligibility: d.eligibility || null,
    certification: d.certification || null,
    outcomes: d.outcomes,
    featured: d.featured,
    isPublished: d.isPublished,
    sortOrder: d.sortOrder,
  };

  try {
    if (id) {
      await db.course.update({ where: { id }, data });
      await db.courseModule.deleteMany({ where: { courseId: id } });
      await db.courseModule.createMany({
        data: d.modules.map((m, i) => ({ courseId: id, title: m.title, description: m.description ?? null, sortOrder: i })),
      });
    } else {
      const created = await db.course.create({ data });
      await db.courseModule.createMany({
        data: d.modules.map((m, i) => ({ courseId: created.id, title: m.title, description: m.description ?? null, sortOrder: i })),
      });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: `The slug "${d.slug}" is already in use.` };
    }
    console.error("[saveCourse]", e);
    return { error: "Could not save the course. Please try again." };
  }

  revalidateCourse(d.slug);
  redirect("/admin/courses");
}

export async function togglePublish(id: string, next: boolean) {
  await ensureStaff();
  const db = requireDb();
  const course = await db.course.update({ where: { id }, data: { isPublished: next } });
  revalidateCourse(course.slug);
}

export async function deleteCourse(id: string) {
  await ensureStaff();
  const db = requireDb();
  const course = await db.course.delete({ where: { id } });
  revalidateCourse(course.slug);
  redirect("/admin/courses");
}
