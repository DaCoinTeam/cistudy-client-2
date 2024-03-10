import { Address } from "web3"
import { Key } from "../types"

export const getSetValues = (set: Set<Key>) => Array.from(set.values())

export const truncateAddress = (address: Address): string => {
    const beginning = address.slice(0, 6)
    const ending = address.slice(-4)
    return `${beginning}...${ending}`
}