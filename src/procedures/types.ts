export type Procedure<P, D> = (params: P, dependencies: D) => Promise<any>
