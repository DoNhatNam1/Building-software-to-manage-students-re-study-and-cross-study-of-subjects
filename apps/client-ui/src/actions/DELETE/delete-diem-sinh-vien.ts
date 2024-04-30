
"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

// Hàm lấy thông tin tất cả các phòng khách sạn
export async function deleteDiemById(id: string) {
    const deletedDiem = await prisma.tbDiem.delete({
        where: { id },
    });
    return deletedDiem;
}