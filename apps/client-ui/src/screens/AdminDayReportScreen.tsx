'use server'

import AdminNavItems from "@/components/AdminNavItems";
import DayReportBody from "@/shared/Admin/DayReportBody";
import { cookies } from "next/headers";

export default async function AdminDayReportScreen () {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");
  return (
    <>
        <div className="w-full h-full flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <DayReportBody />
        </div>
    </>
  )
}
