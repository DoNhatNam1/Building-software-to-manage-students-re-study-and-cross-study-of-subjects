'use server'
import AdminNavItems from "@/components/AdminNavItems";
import AdminSinhVienBody from "@/shared/Admin/AdminSinhVienBody";
import { cookies } from "next/headers";

export default async function AdminHomeScreen() {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  return (
    <>
      <div className="w-full h-screen bg-slate-200 flex">
        {/* <Dashboard /> */}
        <AdminNavItems />
        <AdminSinhVienBody />
      </div>
    </>
  );
};
