'use server'

import AdminNavItems from "@/components/AdminNavItems";
import AdminScheduleBody from "@/shared/Admin/AdminScheduleBody";
import { cookies } from "next/headers";

export default async function AdminScheduleScreen() {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  return (
    <>
      <div className="w-full h-screen overflow-hidden bg-slate-200 flex">
        {/* <Dashboard /> */}
        <AdminNavItems />
        <AdminScheduleBody 
        />
      </div>
    </>
  );
};
