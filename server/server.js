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
    port: 3001,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Authorization']
      }
    }
  })

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
    method: 'GET',
    path: '/highscores',
    handler: (request, h) => {
      const highscores = conn.select().table('highscores').orderBy('score', 'desc')
      return highscores
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