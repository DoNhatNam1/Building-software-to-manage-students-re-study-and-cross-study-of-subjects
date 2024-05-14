'use server'

import prisma from "@/lib/prismaDb"
import { cookies } from 'next/headers'

export default async function CreateLesson(Data: any){
    const admin_id = cookies().get('user_id')?.value 

    const findLessonId = await prisma.tbHocPhan.findFirst({
        where: {
            id: Data.id
        }
    })

    const findLessonName = await prisma.tbHocPhan.findFirst({
        where: {
            TenHocPhan: Data.TenHocPhan
        }
    })

    if (findLessonId) {
        throw new Error(`Mã Học phần đã tồn tại trong dữ liệu`);   
    }

    if (findLessonName) {
        throw new Error(`Học phần ${Data.TenHocPhan} đã tồn tại trong dữ liệu`);   
    }

    let createHocPhanQuery;

    if (Data.id !== '') {
        createHocPhanQuery = await prisma.tbHocPhan.create({
            data: {
                TenHocPhan: Data.TenHocPhan,
                SoTinChi: Data.SoTinChi,
                GiaCa: Data.GiaCa,
                id: Data.id
            }
        });
    } else {
        createHocPhanQuery = await prisma.tbHocPhan.create({
            data: {
                TenHocPhan: Data.TenHocPhan,
                SoTinChi: Data.SoTinChi,
                GiaCa: Data.GiaCa,
            }
        });
    }

      return createHocPhanQuery;
}