import type { HttpContext } from '@adonisjs/core/http'

export default class TarefasController {
  async index({ auth }: HttpContext) {
    const user = auth.user!
    await user.load('tarefas')
    return user
  }

  // async store({ request, auth }: HttpContext) {}

  // async show({ params }: HttpContext) {}

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
