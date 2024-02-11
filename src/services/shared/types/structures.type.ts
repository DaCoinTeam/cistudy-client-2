export type Scalar = object | string | number | boolean;
export type Atomic = Scalar | Array<Scalar>;

type RecursiveStructure<T> = T extends (infer U)[]
  ? { [V in keyof U]: RecursiveStructure<U[V]> }
  : T extends Record<string, Atomic>
  ? { [V in keyof T]: RecursiveStructure<T[V]> }
  : boolean;

export type Structure<T> = RecursiveStructure<T> extends Record<string, Atomic>
  ? RecursiveStructure<T>
  : Record<string, Atomic>;

