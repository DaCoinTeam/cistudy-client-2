import { Key } from "../types"

export const getSetValues = (set: Set<Key>) => Array.from(set.values())

export const concatArrays = <T>(
    data: Array<Array<T> | undefined> | undefined
): Array<T> => {
    if (!data) return []
    const result: Array<T> = []
    for (const array of data) {
        if (!array) continue
        result.push(...array)
    }
    return result
}
