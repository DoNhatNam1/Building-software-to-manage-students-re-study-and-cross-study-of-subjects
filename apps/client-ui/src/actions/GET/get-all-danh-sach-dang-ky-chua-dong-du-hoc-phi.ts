
'use server'
// Import Prisma và các phần cần thiết khác
import prisma from "../../lib/prismaDb";
import { cookies } from 'next/headers';

// Hàm lấy danh sách hóa đơn có SoTienPhaiTra bé hơn SoTienDaTra
export default async function getUnpaidInvoices() {
    // Lấy user_id và role từ cookies
    const user_id = cookies().get('user_id')?.value;
    const role = cookies().get('role')?.value;

    if (role === 'Admin') {
        // Sử dụng aggregate để tính tổng số tiền đã trả và số tiền phải trả
        return await prisma.tbDangKyHocPhan.findMany({
            select: {
                id: true,
                MaHocPhan: true,
                MaSinhVien: true,
                DiemGiuaKi: true,
                DiemCuoiKi: true,
                NgayDangKy: true,
                KieuDangKy: true,
                        NgayThanhToanGanDay: true,
                        NgayBatDauThanhToan: true,
                        PhuongThucThanhToan: true,
                        GhiChu: true,
                        SoTienDaTra: true,
                        SoTienPhaiTra: true,

            },
            where: {
                SoTienDaTra: { lt: prisma.tbDangKyHocPhan.fields.SoTienPhaiTra}       
            }
        });

    } else {
        // Xử lý trường hợp người dùng không phải là Admin
        return { error: "Bạn không có quyền truy cập" };
    }
}
