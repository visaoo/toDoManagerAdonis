import Tarefa from '#models/tarefa'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Tarefa.createMany([
      {
        titulo: 'ler livro',
        descricao: 'Ler um capítulo de um livro técnico',
        concluido: false,
        usuarioId: 8,
      },
      {
        titulo: 'comprar mantimentos',
        descricao: 'Ir ao mercado comprar comida para a semana',
        concluido: false,
        usuarioId: 8,
      },
      {
        titulo: 'planejar viagem',
        descricao: 'Organizar roteiro para viagem de férias',
        concluido: false,
        usuarioId: 8,
      },
      {
        titulo: 'reunião equipe',
        descricao: 'Participar da reunião semanal do time',
        concluido: false,
        usuarioId: 8,
      },
      {
        titulo: 'meditar',
        descricao: 'Praticar meditação por 15 minutos',
        concluido: false,
        usuarioId: 8,
      },
    ])
  }
}
