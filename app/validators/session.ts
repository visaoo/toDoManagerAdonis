import vine from '@vinejs/vine'

export const createSessionValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail(),
    senha: vine.string().minLength(6)
  })
)
