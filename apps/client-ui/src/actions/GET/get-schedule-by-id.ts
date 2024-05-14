"use server";
import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin phòng con dựa trên tên khu vực
export async function getScheduleById(id: string) {

    return await prisma.tbLichHoc.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          MaGiangVien: true,
          MaHocPhan: true,
          MaPhongHoc: true,
          ThoiGianHoc: true,
          StatusDeXemLichHoc: true
        }
      });
}