import AccessDeniedException from '#exceptions/access_denied_exception'
import Tarefa from '#models/tarefa'
import { createTaskValidator, updateTaskValidator } from '#validators/tarefa'
import type { HttpContext } from '@adonisjs/core/http'

export default class TarefasController {
  async index({ auth }: HttpContext) {
    const user = auth.user!
    await user.load('tarefas')
    console.log('entrou aqui')
    return user
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const { titulo, descricao } = await request.validateUsing(createTaskValidator)
      const user = auth.user!
      await user.related('tarefas').create({
        titulo,
        descricao,
      })
      return { titulo, descricao }
    } catch (error) {
      response.status(400).json({ message: 'Erro ao criar a tarefa.' })
    }
  }

  async show({ params, response, auth }: HttpContext) {
    const id = params.id
    try {
      const task = await Tarefa.query().where('id', id).first()
      if (!task) return response.status(404).json({ message: 'Tarefa nao encontrada.' })
      if (auth.user!.id !== task.usuarioId) throw new AccessDeniedException()
      return task
    } catch (error) {
      if (error instanceof AccessDeniedException) {
        return response.status(403).json({ message: error.message })
      }
      return response.status(400).json({ message: 'Erro interno do servidor' })
    }
  }

  async update({ params, request, response, auth }: HttpContext) {
    const id = params.id
    try {
      const task = await Tarefa.query().where('id', id).first()

      if (!task) return response.status(404).json({ message: 'Tarefa nao encontrada.' })

      if (auth.user!.id !== task.usuarioId) throw new AccessDeniedException()

      const { titulo, descricao, concluido } = await request.validateUsing(updateTaskValidator)
      task.merge({ titulo, descricao, concluido })
      console.log('mergiado')
      await task.save()

      return response.status(200).json(task)
    } catch (error) {
      if (error instanceof AccessDeniedException) {
        return response.status(403).json({ message: error.message })
      }
      console.error(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    const id = params.id
    const task = await Tarefa.query().where('id', id).first()
    if (!task) return response.status(404).json({ message: 'Tarefa nao encontrada.' })
    await task.delete()

    return response.status(200).json({ message: 'Tarefa deletada com sucesso.'})
  }
}
