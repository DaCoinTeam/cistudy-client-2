
export const computePercentage = (numerator: number, denominator: number, fractionDigits: number = 2): number => {
    const fixed = (numerator * 100 / denominator).toFixed(fractionDigits)
    return Number.parseFloat(fixed)
}