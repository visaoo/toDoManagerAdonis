// import tarefa_seeder from '#database/seeders/tarefa_seeder'
// import user_seeder from '#database/seeders/user_seeder'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { test } from '@japa/runner'
import { faker } from '@faker-js/faker' 
// import { authApiClient } from '@adonisjs/auth/plugins/api_client'
// import User from '#models/user'

test.group('Users list', (group) => {
  let trx: TransactionClientContract

  const nome = faker.person.fullName()
  const email = faker.internet.email()
  const senha = faker.internet.password()
  let token: any
  // Transaction rollback depois de cada teste
  group.each.setup(async () => {
    trx = await db.transaction()
    // new user_seeder(trx).run()
    // new tarefa_seeder(trx).run() // problemas para saber qual e o id do usuario, ja que na transaction nenhum id e gerado no mysql
    return () => trx.rollback()
  })

  /**
   * tem que ter dois asserts um para verificar o status outra para verificar o retorno.
   */
  test('deve criar e listar o usuario.', async ({ client }) => {
    // cria um usuário
    const value_default = 10
    for (let i = 0; i < value_default; i++) {
      const nome = faker.person.fullName()
      const email = faker.internet.email()
      const senha = faker.internet.password()

      await client.post('/users').json({
        nome,
        email,
        senha,
      })
    }

    const response = await client.get('/users')

    const body = response.body()

    for (let i = 0; i < value_default; i++) {
      let usuario = body[i]
      // console.log(usuario)
      response.assertBodyContains([usuario])
    }
    response.assertStatus(200)
    // adicionar o for para verificar todos os usuarios.
  })

  test('deve criar um usuario com sucesso.', async ({ client, assert }) => {
    const response = await client.post('users').json({ nome, email, senha })
    const body = response.body()
    assert.exists(body.email)
    response.assertStatus(201)
  })

  test('deve falhar ao criar um usuario pela falta do campo email', async ({ client, assert }) => {
    const response = await client.post('users').json({ nome, senha })
    const body = response.body()

    assert.exists(body.errors[0].field == 'email')
    response.assertStatus(422)
  })

  test('deve falhar pois a senha é curta', async ({ client,assert }) => {
    const response = await client.post('users').json({ nome, email, senha: '12345' })
    const body = response.body()
    // console.log(body)
    assert.exists(body.errors[0].field == 'password')
    response.assertStatus(422)
  })

  test('deve gerar um token de autenticação válido', async ({ client, assert }) => {
    const response = await client.post('session').json({ email, senha })

    const body = response.body()
    // console.log(body)
    token = body

    response.assertStatus(200)
    assert.exists(token.token)
  })

  test('deve logar um usuario', async ({ client }) => {
    const response = await client.put('/users/1').json({ nome: 'zeRolinhaJunior', senha: 'ze123456789' }).header('Authorization', `Bearer ${token.token}`)
    const body = response.body()

    // console.log(body)
    response.assertStatus(200)
    response.assertBodyContains(body)
  })
})
