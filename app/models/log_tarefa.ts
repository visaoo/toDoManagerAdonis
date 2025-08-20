import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { AcaoEnum } from '../enums/AcaoEnum.js'

export default class LogTarefa extends BaseModel {
  public static table = 'log_tarefas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuarioId: number

  @column()
  declare usuarioNome: string

  @column()
  declare acao: AcaoEnum

  @column()
  declare titulo: string

  @column()
  declare descricao: string | null

  @column()
  declare concluido: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
