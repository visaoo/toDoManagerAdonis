import { Exception } from '@adonisjs/core/exceptions'

export default class TaskCreationException extends Exception {
  constructor(message: string = 'Tarefa nao criada.') {
    super(message, { status: 400 })
  }
}


