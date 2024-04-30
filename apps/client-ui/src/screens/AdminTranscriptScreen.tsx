'use server'
import getAllTeacher from "@/actions/GET/get-all-teacher";
import AdminNavItems from "@/components/AdminNavItems";
import AdminTranscriptBody from "@/shared/Admin/AdminTranscriptBody";
import { cookies } from "next/headers";

export default async function AdminTranscriptScreen() {
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  return (
    <>
      <div className="w-full h-screen bg-slate-200 flex">
        {/* <Dashboard /> */}
        <AdminNavItems />
        <AdminTranscriptBody />
      </div>
    </>
  );
};
