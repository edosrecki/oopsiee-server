export interface Context {
  user: string
}

export type Procedure<
  Params = any,
  Return = any
  > = (params: Params, context: Context) => Promise<Return>

export type ProcedureFactory<
  Dependencies = any,
  Params = any,
  Return = any
  > = (dependencies: Dependencies) => Procedure<Params, Return>

export interface ProcedureFactories {
  [key: string]: ProcedureFactories | ProcedureFactory
}

export interface FlatProcedureFactories {
  [key: string]: ProcedureFactory
}
