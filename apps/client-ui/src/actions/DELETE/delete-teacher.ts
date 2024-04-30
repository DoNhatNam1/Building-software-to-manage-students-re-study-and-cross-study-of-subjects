
"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

// Hàm lấy thông tin tất cả các phòng khách sạn
export async function deleteTeacherById(id: string) {

    const findGiangVienLichHoc = await prisma.tbLichHoc.findFirst({
        where: {
            MaGiangVien: id,
        },
        select: {
            id: true,
        },
    })

    if(findGiangVienLichHoc){
        throw new Error("Error 404, Giảng viên này còn tồn tại trong thông tin Học phần, vui lòng thử lại sau khi xóa học phần!");
        
    } else {

        return await prisma.tbGiangVien.delete({
            where: { id },
        });
    }

}