
'use server'

import prisma from "@/lib/prismaDb"
import { cookies } from 'next/headers'

export default async function updateDangKyDiem(data: any){

      // Nếu không có ID trùng, tiến hành cập nhật
        const update =  await prisma.tbDangKyHocPhan.update({
        where: {
          id: data.id
        },
        data: {
            DiemGiuaKi: parseInt(data.DiemGiuaKi),
            DiemCuoiKi: parseInt(data.DiemCuoiKi),
        }
      });

      console.log('Data Update', update)
}