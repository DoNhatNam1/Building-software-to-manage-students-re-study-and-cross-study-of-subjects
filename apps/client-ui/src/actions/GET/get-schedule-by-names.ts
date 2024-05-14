
"use server";
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers'

export default async function getShedulebyNames({
    dataHocPhan,
    dataGiangVien
} : {
    dataHocPhan: string,
    dataGiangVien: string
}) {
    const admin_id = cookies().get('user_id')?.value // Lấy user_id từ cookies
    const role = cookies().get('role')?.value// Lấy user_id từ cookies

    if (role === 'Admin') {

        const whereClause = {
            ...(dataHocPhan && { MaHocPhan: dataHocPhan }),
            ...(dataGiangVien && { MaGiangVien: dataGiangVien })
        };

        const results = await prisma.tbLichHoc.findMany({
            where: whereClause,
            select: {
                id: true, 
                MaGiangVien: true,
                MaHocPhan: true,
                MaPhongHoc: true,
                ThoiGianHoc: true,
                StatusDeXemLichHoc: true
            }
        });

        if (results.length === 0) {
            throw new Error("Không tìm thấy trong danh sách");
        }

        return results;
    } else {
        throw new Error("Unauthorized access. Only Admins are allowed.");
    }
}
