'use client'

import { z } from "zod";

export const formSchemaCreateLesson = z.object({
  id: z.string(),
  TenHocPhan: z.string().min(1, "Tên học phần không được bỏ trống"),
  SoTinChi: z.number().min(1,'Số tín chỉ không được bỏ trống'),
  GiaCa: z
    .number()
    .min(1, "Giá cả không được bỏ trống"),
});
