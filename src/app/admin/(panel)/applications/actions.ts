"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { requireDb } from "@/lib/db";
import { STATUS_ORDER, type ApplicationStatus } from "@/lib/applications";

async function ensureStaff() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "STAFF") {
    throw new Error("Unauthorised");
  }
}

export async function updateStatus(id: string, status: string) {
  await ensureStaff();
  if (!STATUS_ORDER.includes(status as ApplicationStatus)) {
    throw new Error("Invalid status");
  }
  const db = requireDb();
  await db.application.update({
    where: { id },
    data: { status: status as ApplicationStatus },
  });
  revalidatePath(`/admin/applications/${id}`);
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}

export async function saveNotes(id: string, formData: FormData) {
  await ensureStaff();
  const notes = (formData.get("notes") as string | null)?.slice(0, 4000) ?? "";
  const db = requireDb();
  await db.application.update({
    where: { id },
    data: { notes: notes || null },
  });
  revalidatePath(`/admin/applications/${id}`);
}
