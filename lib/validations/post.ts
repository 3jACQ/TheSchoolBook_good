import * as z from "zod"

export const postSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caracteres"
  }).max(64, {
    message: "Le titre peut contenir uniquement 64 caracteres"
  }),
  description: z.string().min(9, {
    message: "La description doit contenir au moins 9 caracteres"
  }).max(256, {
    message: "La description peut contenir uniquement 256 caracteres"
  }),
  file: z.any().optional(),
  filters: z.string().optional(),
})

export const comments = z.object({
  comment: z.string().min(3, {
    message: "Le commentaire doit contenir au moins 3 caracteres"
  }).max(256, {
    message: "Le commentaire peut contenir uniquement 256 caracteres"
  }),
})

export const NotionPostSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caracteres"
  }).max(64, {
    message: "Le titre peut contenir uniquement 64 caracteres"
  }),
  description: z.string().min(9, {
    message: "La description doit contenir au moins 9 caracteres"
  }).max(256, {
    message: "La description peut contenir uniquement 256 caracteres"
  }),
  notionUrl: z.string().nonempty({
    message: "L'url notion ne peut pas etre vide"
  }).url({
    message:"L'url n'est pas valide"
  }),
  filters: z.string().optional(),
})
