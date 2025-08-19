// App/Exceptions/AccessDeniedException.ts
import { Exception } from '@adonisjs/core/exceptions'
export default class AccessDeniedException extends Exception {
  constructor(
    message: string = 'Acesso negado.',
    status: number = 403,
    code: string = 'ACCESS_DENIED'
  ) {
    super(message, { status, code })
  }
}
