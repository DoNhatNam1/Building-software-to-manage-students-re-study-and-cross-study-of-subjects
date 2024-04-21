'use client'

import { z } from "zod";

export const formSchemaCreateTeacher = z.object({
  id: z.string(),
  TenGiangVien: z.string().min(1, "Tên giảng viên không được bỏ trống"),
  email: z.string().email(),
  phone_number: z
    .number()
    .min(10, "SDT phải có ít nhất 10 chữ số"),
});
