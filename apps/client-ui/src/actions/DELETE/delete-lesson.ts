
"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

// Hàm lấy thông tin tất cả các phòng khách sạn
export async function deleteLessonById(id: string) {

    const findHocPhanLichHoc = await prisma.tbLichHoc.findFirst({
        where: {
            MaHocPhan: id,
        },
        select: {
            id: true,
        },
    })
    
    const findHocPhanDiem = await prisma.tbDiem.findFirst({
        where: {
            MaHocPhan: id,
        },
        select: {
            id: true,
        },
    })

    const findHocPhanDangKy = await prisma.tbDangKyHocPhan.findFirst({
        where: {
            MaHocPhan: id,
        },
        select: {
            id: true,
        },
    })

    if(findHocPhanLichHoc || findHocPhanDiem || findHocPhanDangKy){
        throw new Error("Error 404, Học phần này còn tồn tại trong thông tin diểm hay lịch học, đăng ký của sinh viên, vui lòng thử lại sau khi đã xóa hết!");
        
    } else {

        return await prisma.tbHocPhan.delete({
            where: { id },
        });
    }

}