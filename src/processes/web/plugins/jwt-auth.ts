import { FastifyHttpRequest, FastifyHttpResponse, FastifyNext } from 'fastify'
import { decode, verify } from 'jsonwebtoken'
import { get, split } from 'lodash'
import fp from 'fastify-plugin'

export const jwtAuth = (keys: any) => fp(async (instance, options, next) => {
  instance.decorate('jwtAuth', (request: FastifyHttpRequest, reply: FastifyHttpResponse, next: FastifyNext) => {
    try {
      const token = extractToken(request)
      const { user, key } = decodeToken(keys, token)
      validateToken(token, key)

      request.context = { user }
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

function decodeToken (keys: any, token: string) {
  const data = decode(token)
  const user = get(data, 'user')

  if (!user) {
    throw new Error('Invalid JWT token payload.')
  }

  const key = keys[user]
  if (!key) {
    throw new Error(`Missing PEM key for user ${user}.`)
  }

  return { user, key }
}

function validateToken (token: string, key: string) {
  try {
    verify(token, key, { algorithms: ['RS256'] })
  } catch (error) {
    throw new Error('Invalid JWT token signature.')
  }
}
