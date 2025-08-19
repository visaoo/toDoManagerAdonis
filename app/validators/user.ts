import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'string.base': 'O campo {field} deve ser um texto',
  'string.email': 'O campo {field} deve ser um email válido',
  'string.minLength': 'O campo {field} deve ter pelo menos {min} caracteres',
})

export const createUserValidator = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    senha: vine.string().minLength(6),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, email) => {
        const user = await db.from('usuarios').where('email', email).first()
        return !user
      }),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().optional(),
    senha: vine.string().minLength(6).optional(),
  })
)
