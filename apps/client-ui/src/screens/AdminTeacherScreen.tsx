'use server'
import getAllTeacher from "@/actions/GET/get-all-teacher";
import AdminNavItems from "@/components/AdminNavItems";
import AdminTeacherBody from "@/shared/Admin/AdminTeacherBody";
import { cookies } from "next/headers";

export default async function AdminTeacherScreen() {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  const dataTeacher = await getAllTeacher()
  return (
    <>
      <div className="w-full h-screen overflow-hidden bg-slate-200 flex">
        {/* <Dashboard /> */}
        <AdminNavItems />
        <AdminTeacherBody dataTeacher={dataTeacher} />
      </div>
    </>
  );
};
