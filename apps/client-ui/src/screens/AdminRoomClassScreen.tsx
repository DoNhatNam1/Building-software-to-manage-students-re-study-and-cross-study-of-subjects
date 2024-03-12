"use server";

import AdminNavItems from "@/components/AdminNavItems";
import RoomBody from "@/shared/Admin/RoomBody";

import { cookies } from "next/headers";

export default async function AdminRoomClassScreen () {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");
    return (
      <>
        <div className="w-full h-full bg-slate-200 flex">
          {/* <Dashboard /> */}
          <AdminNavItems />
          <RoomBody />
        </div>
      </>
    );
}
