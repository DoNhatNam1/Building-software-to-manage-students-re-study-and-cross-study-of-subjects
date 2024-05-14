
'use server'

import prisma from "@/lib/prismaDb"
import { cookies } from 'next/headers'

export default async function updateScheduleById(data: any){

      // Nếu không có ID trùng, tiến hành cập nhật
        const update =  await prisma.tbLichHoc.update({
        where: {
          id: data.id
        },
        data: {
            id: data.id,
            MaGiangVien: data.MaGiangVien,
            MaHocPhan: data.MaHocPhan,
            MaPhongHoc: data.MaPhongHoc,
            ThoiGianHoc: data.ThoiGianHoc,
            StatusDeXemLichHoc: data.StatusDeXemLichHoc,
        }
      });

      console.log('Data Update', update)
}