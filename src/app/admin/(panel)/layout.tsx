import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminShell } from "./AdminShell";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · S7 Academy Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  // Middleware already gates /admin, but double-check here (defence in depth).
  if (!session?.user) redirect("/admin/login");

  const userName = session.user.name ?? session.user.email ?? "Admin";

  return <AdminShell userName={userName}>{children}</AdminShell>;
}
