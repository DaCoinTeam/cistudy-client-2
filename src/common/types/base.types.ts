export type Key = string | number

export interface WithIndex<T> {
    data: T,
    index: number
}