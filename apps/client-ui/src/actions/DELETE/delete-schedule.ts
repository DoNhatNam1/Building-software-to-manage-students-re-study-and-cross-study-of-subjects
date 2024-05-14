
"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

// Hàm lấy thông tin tất cả các phòng khách sạn
export async function deleteScheduleById(id: string) {

        return await prisma.tbLichHoc.delete({
            where: { id },
        });
    
}