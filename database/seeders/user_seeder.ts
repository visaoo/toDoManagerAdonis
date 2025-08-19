import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        nome: 'ayrtonSenna',
        email: 'ayrton@example.com',
        senha: 'senna',
      },
      {
        nome: 'barbara',
        email: 'barbara@example.com',
        senha: 'barbera',
      },
      {
        nome: 'mario',
        email: 'mario@example.com',
        senha: 'mario',
      },
      {
        nome: 'luan',
        email: 'luan@example.com',
        senha: 'luan',
      },
      {
        nome: 'mariaX',
        email: 'mariaX@example.com',
        senha: 'mariaX',
      },
    ])
  }
}
