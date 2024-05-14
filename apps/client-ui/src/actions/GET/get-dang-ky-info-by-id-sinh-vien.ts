"use server";
import prisma from "../../lib/prismaDb";

export async function getDangKyInfoByIdSinhVien(id: string) {

  return await prisma.tbDangKyHocPhan.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      MaHocPhan: true,
      MaSinhVien: true,
      DiemGiuaKi: true,
      DiemCuoiKi: true,
      NgayDangKy: true,
      KieuDangKy: true,
      NgayBatDauThanhToan: true,
      NgayThanhToanGanDay: true,
      PhuongThucThanhToan: true,
      GhiChu: true,
      SoTienDaTra: true,
      SoTienPhaiTra: true,
    }
  });
}