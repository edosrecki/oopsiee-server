import flatten from 'flat'
import { FlatProcedureFactories, ProcedureFactories } from './types'

import { example } from './example'

export const procedures = flatten<ProcedureFactories, FlatProcedureFactories>({
  example
})
