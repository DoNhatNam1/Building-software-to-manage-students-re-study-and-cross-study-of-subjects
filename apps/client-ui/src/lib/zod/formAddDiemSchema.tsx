'use client'

import { z } from "zod";

export const formAddDiemSchema = z.object({
  DiemGiuaKi: z.number(),
  DiemCuoiKi: z.number(),
});