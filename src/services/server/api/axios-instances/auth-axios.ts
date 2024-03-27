import axios, { AxiosError, AxiosHeaders } from "axios"
import {
    buildBearerTokenHeader,
    getClientId,
    AuthTokenType,
    ErrorResponse,
    ErrorStatusCode,
    saveTokens,
    AuthTokens,
} from "@common"

export const authAxios = axios.create()

authAxios.interceptors.request.use(
    (config) => {
        const authTokenType = config?.headers.get("Auth-Token-Type") as AuthTokenType ?? AuthTokenType.Access
        const headers = new AxiosHeaders({
            ...config.headers,
            Authorization: buildBearerTokenHeader(authTokenType),
            "Client-Id": getClientId(),
            "Auth-Token-Type": authTokenType
        })
        return {
            ...config,
            headers,
        }
    },
    (ex) => {
        return Promise.reject(ex)
    }
)

authAxios.interceptors.response.use(
    async (response) => {
        const { data, tokens } = response.data
        if (tokens)
            saveTokens(tokens as AuthTokens)
        return data
    },
    async (ex: AxiosError) => {
        const error = ex.response?.data as ErrorResponse
        const { statusCode } = error
        const authTokenType =
        ex.config?.headers.get("Auth-Token-Type") ?? AuthTokenType.Access
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        ) {
            return await authAxios.request({
                ...ex.config,
                headers: {
                    ...ex.config?.headers,
                    "Auth-Token-Type": AuthTokenType.Refresh,
                },
            })
        }
        throw error
    }
)