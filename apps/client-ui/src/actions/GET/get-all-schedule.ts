"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

// Hàm lấy thông tin tất cả các phòng khách sạn
export default async function getAllSchedule() {
    const admin_id = cookies().get('user_id')?.value // Lấy user_id từ cookies
    const role = cookies().get('role')?.value// Lấy user_id từ cookies

    if(role === 'Admin'){
        return await prisma.tbLichHoc.findMany({
            select: {
                id: true, 
                MaGiangVien: true,
                MaHocPhan: true,
                MaPhongHoc: true,
                ThoiGianHoc: true,
                StatusDeXemLichHoc: true
            }
    }) 
    }

}