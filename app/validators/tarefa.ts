import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    titulo: vine.string().trim().maxLength(50),
    descricao: vine.string().trim().maxLength(255).optional()
  })
)

export const updateTaskValidator = vine.compile(
  vine.object({
    titulo: vine.string().trim().maxLength(50).optional(),
    descricao: vine.string().trim().maxLength(255).optional(),
    concluido: vine.boolean().optional()
  }))
