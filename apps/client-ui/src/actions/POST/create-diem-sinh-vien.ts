
'use server'

import prisma from "@/lib/prismaDb"
import { cookies } from 'next/headers'

export default async function createDiemSinhVien(DiemData: any){
    const admin_id = cookies().get('user_id')?.value 

    const findNgayThiDiem = await prisma.tbDiem.findFirst({
        where: {
            NgayThi: DiemData.NgayThi
        }
    })

    if (findNgayThiDiem) {
        throw new Error(`Ngày thi bị trùng vui lòng đổi lại!`);   
    }

    return await prisma.tbDiem.create({
        data: {
            MaHocPhan: DiemData.MaHocPhan,
            MaSinhVien: DiemData.MaSinhVien,
            DiemGiuaKi: DiemData.DiemGiuaKi,
            DiemCuoiKi: DiemData.DiemCuoiKi,
            NgayThi: DiemData.NgayThi
        }
      });

}