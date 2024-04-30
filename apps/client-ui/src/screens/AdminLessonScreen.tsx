'use server'
import getAllLesson from "@/actions/GET/get-all-lesson";
import AdminNavItems from "@/components/AdminNavItems";
import AdminLessonBody from "@/shared/Admin/AdminLessonBody";
import { cookies } from "next/headers";

export default async function () {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  const dataLessons = await getAllLesson()
  return (
    <>
      <div className="w-full h-screen bg-slate-200 flex">
        {/* <Dashboard /> */}
        <AdminNavItems />
        <AdminLessonBody dataLessons={dataLessons} />
      </div>
    </>
  );
};
