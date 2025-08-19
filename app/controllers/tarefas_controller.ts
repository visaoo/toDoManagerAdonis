import AccessDeniedException from '#exceptions/access_denied_exception'
import TaskNotFoundException from '#exceptions/task_not_found_exception'
import Tarefa from '#models/tarefa'
import { createTaskValidator, updateTaskValidator } from '#validators/tarefa'
import type { HttpContext } from '@adonisjs/core/http'
// import { Database } from '@adonisjs/lucid/database'
import db from '@adonisjs/lucid/services/db'

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

      await db.transaction(async (trx) => {
        await user.related('tarefas').create({ titulo, descricao }, { client: trx })
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
      if (!task) throw new TaskNotFoundException()
      if (auth.user!.id !== task.usuarioId) throw new AccessDeniedException()
      return task
    } catch (error) {
      if (error instanceof AccessDeniedException) {
        return response.status(error.status).json({ message: error.message, code: error.code })
      }
      if (error instanceof TaskNotFoundException) {
        return response.status(error.status).json({ message: error.message, code: error.code })
      }
      return response.status(400).json({ message: 'Erro interno do servidor' })
    }
  }

  async update({ params, request, response, auth }: HttpContext) {
    const id = params.id
    try {
      const { titulo, descricao, concluido } = await request.validateUsing(updateTaskValidator)
      const task = await Tarefa.query().where('id', id).first()

      if (!task) throw new TaskNotFoundException()
      if (auth.user!.id !== task.usuarioId) throw new AccessDeniedException()

      db.transaction(async (trx) => {
        task.merge({ titulo, descricao, concluido })
        console.log('mergiado')
        await task.useTransaction(trx).save()
      })

      return response.status(200).json(task)
    } catch (error) {
      if (error instanceof AccessDeniedException) {
        return response.status(403).json({ message: error.message, code: error.code })
      }
      if (error instanceof TaskNotFoundException) {
        return response.status(error.status).json({ message: error.message, code: error.code })
      }
      console.error(error)
    }
  }

  async destroy({ params, response, auth }: HttpContext) {
    const id = params.id
    try {
      const task = await Tarefa.query().where('id', id).first()
      if (!task) throw new TaskNotFoundException()
      if (auth.user!.id !== task.usuarioId) throw new AccessDeniedException()

      await db.transaction(async (trx) => {
        await task.useTransaction(trx).delete()
      })

      return response.status(200).json({ message: 'Tarefa deletada com sucesso.' })
    } catch (error) {
      if (error instanceof AccessDeniedException) {
        return response.status(403).json({ message: error.message, code: error.code })
      }
      if (error instanceof TaskNotFoundException) {
        return response.status(error.status).json({ message: error.message, code: error.code })
      }

      return response.status(500).json({ message: 'Erro interno do servidor.' })
    }
  }
}
