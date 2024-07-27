import { Address } from "web3"
import { Key } from "../types"
import numeral from "numeral"

export const getSetValues = (set: Set<Key>) => Array.from(set.values())

export const truncate = (address: Address): string => {
    const beginning = address.slice(0, 4)
    const ending = address.slice(-2)
    return `${beginning}...${ending}`
}

export const sanitizeNumericInput = (input: string): string | null => {
    const regex = new RegExp(/^\d*[.,]?\d*$/)
    if (!regex.test(input)) {
        return null
    }
    return input.replace(/,/g, ".")
}

export const formatNumber = (number: number | undefined): string => {
    return numeral(number).format("0.00a")
}

export const formatNouns = (amount: number | undefined, noun: string) => {
    if(amount && amount > 1) {
        return `${amount} ${noun}s`
    } else 
        return `${amount || 0} ${noun}`
}