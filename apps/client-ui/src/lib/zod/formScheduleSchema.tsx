'use client'

import { z } from "zod";

export const formScheduleSchema = z.object({
  MaHocPhan: z.string(),
  MaPhongHoc: z.string(),
  MaGiangVien: z.string(),
  StatusDeXemLichHoc: z.string(),
});