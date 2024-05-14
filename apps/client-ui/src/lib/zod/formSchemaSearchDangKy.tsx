'use client'

import { z } from "zod";

export const formSchemaSearchDangKy = z.object({
  MaSinhVien: z.string(),
});
