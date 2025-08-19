import UsersController from '#controllers/users_controller'
import SessionController from '#controllers/session_controller'
import TarefasController from '#controllers/tarefas_controller'

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return { message: 'Welcome to the AdonisJS API!' }
})

router.post('session', [SessionController, 'store'])

router.resource('users', UsersController).apiOnly()
router.group(() => {
  router.resource('task', TarefasController)
}).use(middleware.auth())
