'use server'
import AdminNavItems from "@/components/AdminNavItems";
import AdminTeacherAddNewBody from "@/shared/Admin/AdminTeacherAddNewBody";
import { cookies } from "next/headers";

export default async function AdminAddNewTeacherScreen() {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  return (
    <>
      <div className="w-full h-screen bg-slate-200 flex">
        {/* <Dashboard /> */}
        <AdminNavItems />
        <AdminTeacherAddNewBody />
      </div>
    </>
  );
};
