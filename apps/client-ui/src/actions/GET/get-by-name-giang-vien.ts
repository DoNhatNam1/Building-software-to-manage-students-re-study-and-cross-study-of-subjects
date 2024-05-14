"use server";
import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin phòng con dựa trên tên khu vực
export async function getByNameTeacher(name: any) {

    return await prisma.tbGiangVien.findFirst({
        where: {
          TenGiangVien: name,
        },
        select: {
          id: true,
        }
      });
}