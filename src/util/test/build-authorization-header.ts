import fs from 'fs'
import path from 'path'
import { sign } from 'jsonwebtoken'

const key = fs.readFileSync(path.join(__dirname, './private-key'))

export const buildAuthorizationHeader = (payload: any): string => {
  const token = sign(payload, key, { algorithm: 'RS256' })
  return `Bearer ${token}`
}
