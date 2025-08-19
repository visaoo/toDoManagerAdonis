import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createSessionValidator } from '#validators/session'

export default class SessionController {
  async store({ request, response }: HttpContext) {
    const { email, senha } = await request.validateUsing(createSessionValidator)
    const user = await User.verifyCredentials(email, senha)

    if (!user) {
      return response.status(401).json({ error: 'Credenciais inválidas' })
    }

    return User.accessTokens.create(user)
    // Geração de token ou outra lógica de sessão
  }
  async destroy({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user?.currentAccessToken.identifier)
    return response.status(203)
  }
}
