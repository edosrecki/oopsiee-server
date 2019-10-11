import { FastifyHttpRequest, FastifyHttpResponse, FastifyNext } from 'fastify'
import { decode, verify } from 'jsonwebtoken'
import { get, split } from 'lodash'
import fp from 'fastify-plugin'
import path from 'path'
import { readDirectory } from '../../../util/read-directory'

export const jwtAuth = fp(async (instance, options, next) => {
  const keysPath = path.join(__dirname, '../../../../keys')
  const keys = await readDirectory(keysPath)

  instance.decorate('jwtAuth', (request: FastifyHttpRequest, reply: FastifyHttpResponse, next: FastifyNext) => {
    try {
      const token = extractToken(request)
      const key = extractKey(keys, token)
      validateToken(token, key)
    } catch (error) {
      return reply.status(401).send({ message: error.message })
    }

    next()
  })
})

function extractToken (request: FastifyHttpRequest): string {
  const header = request.headers.authorization

  if (!header) {
    throw new Error(`Missing 'Authorization' header.`)
  }

  const parts = split(header, ' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    throw new Error(`Invalid 'Authorization' header.`)
  }

  return parts[1]
}

function extractKey (keys: any, token: string) {
  const data = decode(token)
  const user = get(data, 'user')

  if (!user) {
    throw new Error('Invalid JWT token payload.')
  }

  const key = keys[user]
  if (!key) {
    throw new Error(`Missing PEM key for user ${user}.`)
  }

  return key
}

function validateToken (token: string, key: string) {
  try {
    verify(token, key, { algorithms: ['RS256'] })
  } catch (error) {
    throw new Error('Invalid JWT token signature.')
  }
}
