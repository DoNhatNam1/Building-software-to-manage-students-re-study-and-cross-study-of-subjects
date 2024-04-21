"use server";

import DichVuDaDangKyBody from "@/shared/SinhVien/DichVuDaDangKyBody";

import { cookies } from "next/headers";

export default async function SinhVienDangKyScreen() {
    const cookieStore = cookies();
    const Admin_id = cookieStore.get("user_id");

    return (
      <>
        <div className="w-full h-screen bg-slate-200 light">
          {/* <Dashboard /> */}
          
          <DichVuDaDangKyBody />
        </div>
      </>
    );
}
