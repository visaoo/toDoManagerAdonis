import stringHelpers from '@adonisjs/core/helpers/string'
import { test } from '@japa/runner'
import { faker } from '@faker-js/faker'

test.group('Funcs', () => {
  test('formatando nome com helper', async () => {
    const nome = faker.person.fullName()
    const nomeCap = stringHelpers.capitalCase(nome)

    console.log(nome, '=>', nomeCap)
  })

  test('Transformando string em seconds', async () => {
    const message = '10h'
    const parse = stringHelpers.seconds.parse(message)

    console.log(message, '=>', parse)
  })
})
