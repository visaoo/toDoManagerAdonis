import { Exception } from '@adonisjs/core/exceptions'
export default class UserNotFoundException extends Exception {
  constructor(
    message: string = 'Usuário não encontrado',
    status: number = 404,
    code: string = 'USER_NOT_FOUND'
  ) {
    super(message, { status, code })
  }
}

