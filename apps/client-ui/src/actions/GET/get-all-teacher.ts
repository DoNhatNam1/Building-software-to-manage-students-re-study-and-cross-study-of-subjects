"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

// Hàm lấy thông tin tất cả các phòng khách sạn
export default async function getAllTeacher() {
    const admin_id = cookies().get('user_id')?.value // Lấy user_id từ cookies
    const role = cookies().get('role')?.value// Lấy user_id từ cookies

    if(role === 'Admin'){
    const allTeacherQuery = await prisma.tbGiangVien.findMany({
        select: {
            id: true, 
            TenGiangVien: true, 
            email: true,
            phone_number: true
        }
    })
    return allTeacherQuery;  
    }

}