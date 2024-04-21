"use server";

import SinhVienNav from "@/components/SinhVienNav";
import ThongBaoBody from "@/shared/SinhVien/ThongBaoBody";

import { cookies } from "next/headers";

export default async function AdminGoodsScreen() {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");

    return (
      <>
        <div className="w-full h-screen bg-slate-200 light">
          {/* <Dashboard /> */}
          
          <SinhVienNav/>
          <ThongBaoBody />
        </div>
      </>
    );
}
