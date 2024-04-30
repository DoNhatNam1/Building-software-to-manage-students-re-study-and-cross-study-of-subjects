"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

// Hàm lấy thông tin tất cả các phòng khách sạn
export default async function getTranscriptByIdStudent(studentId: string) {
    const admin_id = cookies().get('user_id')?.value // Lấy user_id từ cookies
    const role = cookies().get('role')?.value// Lấy user_id từ cookies

    if(role === 'Admin'){
    const findSinhVienQuery = await prisma.subUser.findFirst({
        where:{
            id: studentId,
        }
    })

    if(!findSinhVienQuery){
        throw new Error("Mã sinh viên bạn nhập không tồn tại trong dữ liệu máy chủ");
        
    } else {
        return await prisma.tbDiem.findMany({
            where:{
                MaSinhVien: studentId,
            }
        }) 
    }


    }

}