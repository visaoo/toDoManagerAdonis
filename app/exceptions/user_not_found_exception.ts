import { Exception } from '@adonisjs/core/exceptions'

export default class UserNotFoundException extends Exception {
  constructor(message: string = 'Usuário não encontrado') {
    super(message, { status: 404 })
  }
}

