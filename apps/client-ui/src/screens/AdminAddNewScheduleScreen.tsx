'use server'
import AdminNavItems from "@/components/AdminNavItems";
import AdminScheduleAddNewBody from "@/shared/Admin/AdminScheduleAddNewBody";
import { cookies } from "next/headers";

export default async function AdminAddNewScheduleScreen() {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  return (
    <>
      <div className="w-full h-screen overflow-hidden bg-slate-200 flex">
        {/* <Dashboard /> */}
        <AdminNavItems />
        <AdminScheduleAddNewBody />
      </div>
    </>
  );
};
