"use server";
import prisma from "../../lib/prismaDb";

// Hàm lấy thông tin phòng con dựa trên tên khu vực
export async function getByNamePhongHoc(name: any) {

    return await prisma.tbPhongHoc.findFirst({
        where: {
          TenPhongHoc: name,
        },
        select: {
          id: true,
        }
      });
}