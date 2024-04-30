'use client'

import { z } from "zod";

export const formSchemaSearchDiem = z.object({
  MaSinhVien: z.string(),
});
