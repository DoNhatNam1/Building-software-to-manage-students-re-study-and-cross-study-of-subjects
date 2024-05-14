"use server";
import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin phòng con dựa trên tên khu vực
export async function getHoaDonByDangKyId(id: string) {

    return await prisma.tbDangKyHocPhan.findFirst({
      select: {
        id: true,
        NgayThanhToanGanDay: true,
        NgayBatDauThanhToan: true,
        PhuongThucThanhToan: true,
        GhiChu: true,
        SoTienDaTra: true,
        SoTienPhaiTra: true,
      },
        where: {
          id: id,
        }
      });
}