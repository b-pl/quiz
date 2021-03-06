'use strict'

const Hapi = require('@hapi/hapi')
const knex = require('knex')
require('dotenv').config()

const app = {
  init,
  start
}

function init() {
  const server = Hapi.server({
    port: process.env.APP_PORT,
    routes: {
      cors: true
    }
  })

  server.realm.modifiers.route.prefix = '/api'

  const conn = knex({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    }
  })

  server.route({
    method: 'POST',
    path: '/sendScore',
    options: {
      cors: true,
      handler: async (request, h) => {
        const json = request.payload
        const data = await conn('highscores').insert(json)
  
        return data
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/highscores',
    handler: (request, h) => {
      const highscores = conn.select().table('highscores').limit(10).orderBy('score', 'desc')

      return highscores
    }
  });

  server.route({
    method: 'GET',
    path: '/question/{category}/{lang}',
    handler: (request, h) => {
      const cat = encodeURIComponent(request.params.category)
      const lang = encodeURIComponent(request.params.lang)
      const questions = conn.select().table('questions').where('category', cat).andWhere('lang', lang)

      return questions
    }
  });

  process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
  })

  return server
}

async function start () {
  const server = app.init()
  await server.start()
  console.log('Server running on %s', server.info.uri)
  return server
}

module.exports = app