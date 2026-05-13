import type { Metadata } from "next";
import { AdminMenuManager } from "@/components/admin/AdminMenuManager";

export const metadata: Metadata = {
  title: "Admin | LONG CHA",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return <AdminMenuManager />;
}
