import flatten from 'flat'
import { FlatProcedures, Procedures } from './types'

import { example } from './example'

export const procedures = flatten<Procedures, FlatProcedures>({
  example
})
