
import {
    Atomic,
    AuthTokenType,
    ErrorResponse,
    Structure,
} from "../types"
import { getAuthToken } from "./storage.utils"

export const buildBearerTokenHeader = (
    type: AuthTokenType = AuthTokenType.Access
) => `Bearer ${getAuthToken(type)}`

export const buildPayloadString = <T extends object>(
    structure?: Structure<T>,
    currentPath: Array<string> = []
): string => {
    if (!structure) {
        return ""
    }

    const keys = Object.keys(structure)
    const trueKeys = keys.filter((key, index) => {
        const value = structure[key]
        if (typeof value === "boolean") {
            if (structure[key]) {
                currentPath.push(key)
                if (index !== keys.length - 1) {
                    currentPath.push(" ")
                }
            }
        } else {
            currentPath.push(key)
            currentPath.push("{")
            buildPayloadString(value as Record<string, Atomic>, currentPath)
            currentPath.push("}")
        }
    })

    if (trueKeys.length) {
        for (let i = 0; i < trueKeys.length; i++) {
            currentPath.push(trueKeys[i])
            if (i !== trueKeys.length - 1) currentPath.push(",")
        }
    }

    return currentPath.join(" ")
}

export const buildAuthPayloadString = <T extends object>(
    structure?: Structure<T>,
    authTokenType: AuthTokenType = AuthTokenType.Access
) => {
    const data = buildPayloadString(structure)
    return `data { ${data} } ${
        authTokenType === AuthTokenType.Refresh
            ? "tokens { accessToken, refreshToken }"
            : ""
    }`
}

export const isErrorResponse = (
    response: unknown
): response is ErrorResponse => {
    const { statusCode, error, message } = response as ErrorResponse
    return !!statusCode && !!error && !!message && statusCode >= 400
}
