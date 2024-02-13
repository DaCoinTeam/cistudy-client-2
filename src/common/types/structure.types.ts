export type Scalar = object | string | number | boolean;
export type Atomic = Scalar | Array<Scalar>;

type StructureRecursive<T> = T extends (infer U)[]
  ? { [V in keyof U]: StructureRecursive<U[V]> }
  : T extends Record<string, Atomic>
  ? { [V in keyof T]: StructureRecursive<T[V]> }
  : boolean;

export type Structure<T> = StructureRecursive<T> extends Record<string, Atomic>
  ? StructureRecursive<T>
  : Record<string, Atomic>;

