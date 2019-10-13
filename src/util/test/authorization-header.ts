import fs from 'fs'
import path from 'path'
import { sign } from 'jsonwebtoken'

const key = fs.readFileSync(path.join(__dirname, './private-key'))
const token = sign({ user: 'test' }, key, { algorithm: 'RS256' })

export const authorizationHeader = `Bearer ${token}`
