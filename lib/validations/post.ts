import * as z from "zod"

export const postSchema = z.object({
  title: z.string().min(3,{
    message:"Le titre doit contenir au moins 3 caracteres"
  }).max(64,{
    message:"Le titre peut contenir uniquement 64 caracteres"
  }),
  description:z.string().min(9,{
    message:"La description doit contenir au moins 9 caracteres"
  }).max(256,{
    message:"La description peut contenir uniquement 256 caracteres"
  }),
  file: z.any().optional()
})
