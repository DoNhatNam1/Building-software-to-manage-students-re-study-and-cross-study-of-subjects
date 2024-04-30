"use server";
import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin phòng con dựa trên tên khu vực
export async function getByNameHocPhan(hocphanName: any) {

    return await prisma.tbHocPhan.findFirst({
        where: {
          TenHocPhan: hocphanName,
        },
        select: {
          id: true,
        }
      });
}