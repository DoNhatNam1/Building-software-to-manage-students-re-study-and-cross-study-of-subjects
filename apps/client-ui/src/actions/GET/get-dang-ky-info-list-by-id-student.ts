"use server";
import prisma from "../../lib/prismaDb";

export async function getDangKyInfoListByIdSinhVien(id: string) {
  const findSinhVienQuery = await prisma.subUser.findFirst({
    where:{
        id: id,
    }
})

if(!findSinhVienQuery){
  throw new Error("Mã sinh viên bạn nhập không tồn tại trong dữ liệu máy chủ");
  
} else{
  return await prisma.tbDangKyHocPhan.findMany({
    where: {
      MaSinhVien: id,
    },
    select: {
      id: true,
      MaHocPhan: true,
      MaSinhVien: true,
      DiemGiuaKi: true,
      DiemCuoiKi: true,
      NgayDangKy: true,
      KieuDangKy: true,
      SoTienDaTra: true,
      SoTienPhaiTra: true,
    }
  });
}

}