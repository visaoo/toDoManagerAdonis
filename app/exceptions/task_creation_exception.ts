import { Exception } from '@adonisjs/core/exceptions'
export default class TaskCreationException extends Exception {
  constructor(
    message: string = 'Tarefa não criada',
    status: number = 400,
    code?: string
  ) {
    super(message, { status, code })
  }
}
