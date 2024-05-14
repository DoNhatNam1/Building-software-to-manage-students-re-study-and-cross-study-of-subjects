'use server'
import getAllTeacher from "@/actions/GET/get-all-teacher";
import AdminNavItems from "@/components/AdminNavItems";
import AdminTranscriptAddNewBody from "@/shared/Admin/AdminTranscriptAddNewBody";
import { cookies } from "next/headers";

export default async function AdminGoodsViewTableScreen({idSinhVien}: {idSinhVien: string}){
  const cookieStore = cookies();
  const Admin_id = cookieStore.get("user_id");
  return (
    <>
      <div className="w-full h-screen overflow-hidden bg-slate-200 flex">
        {/* <Dashboard /> */}
        <AdminNavItems />
        <AdminTranscriptAddNewBody
        idSinhVien={idSinhVien}
        
        />
      </div>
    </>
  );
};
