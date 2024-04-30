'use server'

import prisma from "@/lib/prismaDb"
import { cookies } from 'next/headers'

export default async function CreateTeacher(TeacherData: any){
    const admin_id = cookies().get('user_id')?.value 

    const findTeacherEmail = await prisma.tbGiangVien.findFirst({
        where: {
            email: TeacherData.email
        }
    })

    if (findTeacherEmail) {
        throw new Error(`Giảng viên ${TeacherData.TenGiangVien} đã tồn tại với email ${TeacherData.email}`);   
    }

    let createTeacherQuery;

    if (TeacherData.id !== '') {
        createTeacherQuery = await prisma.tbGiangVien.create({
            data: {
                TenGiangVien: TeacherData.TenGiangVien,
                email: TeacherData.email,
                phone_number: TeacherData.phone_number,
                id: TeacherData.id
            }
        });
    } else {
        createTeacherQuery = await prisma.tbGiangVien.create({
            data: {
                TenGiangVien: TeacherData.TenGiangVien,
                email: TeacherData.email,
                phone_number: TeacherData.phone_number,
            }
        });
    }

    return createTeacherQuery;
}