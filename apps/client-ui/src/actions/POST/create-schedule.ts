'use server'

import prisma from "@/lib/prismaDb"
import { cookies } from 'next/headers'

export default async function CreateSchedule(Data: any){
    const admin_id = cookies().get('user_id')?.value 

     await prisma.tbLichHoc.create({
        data: {
            MaGiangVien: Data.MaGiangVien,
            MaHocPhan: Data.MaHocPhan,
            MaPhongHoc: Data.MaPhongHoc,
            ThoiGianHoc: Data.ThoiGianHoc,
        }
    })
}