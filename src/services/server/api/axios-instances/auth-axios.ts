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
        const authTokenType = config.params?.authTokenType ?? AuthTokenType.Access
        const headers = new AxiosHeaders({
            ...config.headers,
            Authorization: buildBearerTokenHeader(authTokenType),
            "Client-Id": getClientId(),
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
        console.log(response)
        const { data, tokens } = response.data
        if (response.config.params?.authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)
        return data
    },
    async (ex: AxiosError) => {
        console.log(ex.response)
        const error = ex.response?.data as ErrorResponse
        const { statusCode } = error
        const authTokenType =
      ex.config?.params?.authTokenType ?? AuthTokenType.Access
        console.log(authTokenType)
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        ) {
            return await authAxios.request({
                ...ex.config,
                params: {
                    authTokenType: AuthTokenType.Refresh,
                },
            })
        }
        throw error
    }
)