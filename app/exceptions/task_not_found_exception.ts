import { Exception } from '@adonisjs/core/exceptions'

export default class TaskNotFoundException extends Exception {
  constructor(
    message: string = 'Tarefa não encontrada.',
    status: number = 404,
    code: string = 'TASK_NOT_FOUND'
  ) {
    super(message, { status, code })
  }
}
