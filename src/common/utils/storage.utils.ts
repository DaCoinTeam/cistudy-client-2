import { AuthTokenType, AuthTokens } from "../types"
const CLIENT_ID = "clientId"
const ACCESS_TOKEN = "accessToken"
const REFRESH_TOKEN = "refreshToken"
const DARK_MODE = "darkMode"


import { v4 as uuidv4 } from "uuid"

export const saveTokens = (tokens: AuthTokens) => {
    localStorage.setItem(ACCESS_TOKEN, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken)
}

export const getClientId = () => {
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

export const getDarkMode = (): boolean => localStorage.getItem(DARK_MODE) === "true"

export const setDarkMode = (value: boolean) => localStorage.setItem(DARK_MODE, value.toString())