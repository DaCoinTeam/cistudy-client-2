import { AuthTokenType, AuthTokens } from "../types"
const CLIENT_ID = "clientId"
const ACCESS_TOKEN = "accessToken"
const REFRESH_TOKEN = "refreshToken"

import { v4 as uuidv4 } from "uuid"

export const saveTokens = (tokens: AuthTokens) => {
    localStorage.setItem(ACCESS_TOKEN, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken)
}

export const getClientId = (): string | null => {
    return localStorage.getItem(CLIENT_ID)
}

export const generateClientId = () => {
    const clientId = localStorage.getItem(CLIENT_ID)
    if (clientId) return
    localStorage.setItem(CLIENT_ID, uuidv4())
}

export const getAuthToken = (
    type: AuthTokenType = AuthTokenType.Access
): string | null =>
    localStorage.getItem(
        type == AuthTokenType.Access ? ACCESS_TOKEN : REFRESH_TOKEN
    )

export const removeTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
}