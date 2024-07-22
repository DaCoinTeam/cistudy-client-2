import numeral from "numeral"

export const computePercentage = (numerator: number, denominator: number, fractionDigits: number = 2): number => {
    const fixed = (numerator * 100 / denominator).toFixed(fractionDigits)
    return Number.parseFloat(fixed)
}

export const computeDenomination = (amount: bigint, decimals = 18, fractionDigits: number = 5) => {
    const decimalMultiplier = 10 ** fractionDigits
    const divisor = 10 ** decimals
    const result = Number(amount * BigInt(decimalMultiplier) / BigInt(divisor))
    return numeral(result / decimalMultiplier).format("0.00a")
}

export const computeRaw = (amount: number, decimals = 18) : bigint => {
    const mutiplier = 10 ** decimals
    return BigInt(amount * mutiplier)
}
export const discountPercentageString = (discountPrice: number, price: number) => {
    if (!discountPrice || !price) return 0
    return (100 - computePercentage(discountPrice, price)).toFixed(0)
}