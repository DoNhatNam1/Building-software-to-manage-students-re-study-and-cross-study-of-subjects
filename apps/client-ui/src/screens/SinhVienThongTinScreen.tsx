"use server";

import ThongTinBody from "@/shared/SinhVien/ThongTinBody";

import { cookies } from "next/headers";

export default async function SinhVienThongTinScreen() {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");

    return (
      <>
        <div className="w-full h-screen bg-slate-200 light">
          {/* <Dashboard /> */}
          
          <ThongTinBody />
        </div>
      </>
    );
}
