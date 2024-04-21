'use client'

import { z } from "zod";

export const formSchemaCreateTeacher = z.object({
  email: z.string().email(),
});
