export type Scalar = object | string | number | boolean;
export type Atomic = Scalar | Array<Scalar>;

type SchemaRecursive<T> = T extends (infer U)[]
  ? { [V in keyof U]: SchemaRecursive<U[V]> }
  : T extends Record<string, Atomic>
  ? { [V in keyof T]: SchemaRecursive<T[V]> }
  : boolean;

export type Schema<T> = SchemaRecursive<T> extends Record<string, Atomic>
  ? SchemaRecursive<T>
  : Record<string, Atomic>;