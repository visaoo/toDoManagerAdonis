import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserNotFoundException from '#exceptions/user_not_found_exception'

export default class UsersController {
  async index() {
    const users = await User.query().preload('tarefas')
    return users
  }

  async store({ request, response }: HttpContext) {
    const { nome, email, senha } = await request.validateUsing(createUserValidator)

    try {
      const user = await User.create({
        nome,
        email,
        senha,
      })

      return response.status(201).json(user)
    } catch (error) {
      response.status(500).json({ error: 'Erro ao criar usuário' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      // const user = await User.findByOrFail('id', params.id)
      const user = await User.query().where('id', params.id).preload('tarefas')
      if (!user) throw new UserNotFoundException()
      // await user.load('tarefas')
      return response.status(200).json(user)
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return response.status(404).json({ error: error.message })
      }
      response.status(500).json({ error: 'Erro ao buscar usuário' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
    const user = await User.findByOrFail('id', params.id)
    const { nome, senha } = await request.validateUsing(updateUserValidator)
      user.merge({ nome, senha }) // enchaminha para o banco
      await user.save()
      return response.status(200).json(user)
    } catch (error) {
      response.status(500).json({ error: 'Erro ao atualizar usuário' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(203).json({ message: 'Usuário deletado com sucesso' })
    } catch (error) {
      response.status(500).json({ error: 'Erro ao deletar usuário' })
    }
  }
}

export { UsersController }
