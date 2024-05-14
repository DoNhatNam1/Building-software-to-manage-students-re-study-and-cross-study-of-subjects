'use server'
import AdminNavItems from "@/components/AdminNavItems";
import AdminLessonAddNewBody from "@/shared/Admin/AdminLessonAddNewBody";
import { cookies } from "next/headers";

export default async function AdminAddNewLessonScreen() {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  return (
    <>
      <div className="w-full h-screen overflow-hidden bg-slate-200 flex">
        {/* <Dashboard /> */}
        <AdminNavItems />
        <AdminLessonAddNewBody />
      </div>
    </>
  );
};
