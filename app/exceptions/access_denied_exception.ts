// App/Exceptions/AccessDeniedException.ts
import { Exception } from '@adonisjs/core/exceptions'

export default class AccessDeniedException extends Exception {
  constructor() {
    super('Acesso negado', { status: 403 })
  }
}
