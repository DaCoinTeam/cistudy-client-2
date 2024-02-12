const ACCESS_TOKEN = "accessToken"
const REFRESH_TOKEN = "refreshToken"
const CLIENT_ID = "clientId"

import {
    Atomic,
    AuthTokenType,
    AuthTokens,
    ErrorResponse,
    Structure,
} from "../types"
import { v4 as uuidv4 } from "uuid"

export const generateClientId = () => {
    const clientId = localStorage.getItem(CLIENT_ID)
    if (clientId) return
    localStorage.setItem(CLIENT_ID, uuidv4())
}

export const saveTokens = (tokens: AuthTokens) => {
    localStorage.setItem("accessToken", tokens.accessToken)
    localStorage.setItem("refreshToken", tokens.refreshToken)
}

export const getClientId = (): string | null => {
    return localStorage.getItem(CLIENT_ID)
}

export const getAuthToken = (
    type: AuthTokenType = AuthTokenType.Access
): string | null =>
    localStorage.getItem(
        type == AuthTokenType.Access ? ACCESS_TOKEN : REFRESH_TOKEN
    )

export const buildBearerTokenHeader = (
    type: AuthTokenType = AuthTokenType.Access
) => `Bearer ${getAuthToken(type)}`

export const buildPayloadString = <T extends object>(
    structure?: Structure<T>,
    currentPath: string[] = []
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
                    currentPath.push("\n")
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

export const buildTokenizedPayloadString = <T extends object>(
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
