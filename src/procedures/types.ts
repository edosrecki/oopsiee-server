export type Procedure<
  Dependencies = any,
  Params = any,
  Return = any
  > = (dependencies: Dependencies) => (params: Params) => Promise<Return>

export interface Procedures {
  [key: string]: Procedures | Procedure
}

export interface FlatProcedures {
  [key: string]: Procedure
}
