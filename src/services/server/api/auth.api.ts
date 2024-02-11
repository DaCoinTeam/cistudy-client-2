import { endpointConfig } from "@config"
import {
    UserEntity,
    AuthTokenType,
    ErrorResponse,
    ErrorStatusCode,
    appendClientIdToQuery,
    buildBearerTokenHeader,
    saveTokens,
    ApiResponse,
} from "@services/shared"
import axios, { AxiosError } from "axios"

const BASE_URL = `${endpointConfig().api}/auth`

export const init = async (
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<UserEntity | ErrorResponse> => {
    try {
        let url = `${BASE_URL}/init`
        url = appendClientIdToQuery(url)!

        const response = await axios.get(url, {
            headers: {
                Authorization: buildBearerTokenHeader(authTokenType),
            },
        })

        const { data, tokens } = response.data as ApiResponse<UserEntity>

        if (authTokenType === AuthTokenType.Refresh) saveTokens(tokens)

        return data
    } catch (ex) {
        console.log(ex)
        const _ex = (ex as AxiosError).response?.data as ErrorResponse
        const { statusCode } = _ex
        console.log(statusCode)
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        ) {
            return await init(AuthTokenType.Refresh)
        }
        return _ex
    }
}

export const signIn = async (params: {
  email: string;
  password: string;
}): Promise<UserEntity | ErrorResponse> => {
    try {
        let url = `${BASE_URL}/sign-in`
        url = appendClientIdToQuery(url)!
        const response = await axios.post(url, params)
        const { data, tokens } = response.data as ApiResponse<UserEntity>

        saveTokens(tokens)

        return data
    } catch (ex) {
        return (ex as AxiosError).response?.data as ErrorResponse
    }
}

export const signUp = async (params: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
}): Promise<string | ErrorResponse> => {
    try {
        let url = `${BASE_URL}/sign-up`
        url = appendClientIdToQuery(url)!
        const response = await axios.post(url, params)
        return response.data as string
    } catch (ex) {
        return (ex as AxiosError).response?.data as ErrorResponse
    }
}

export const verifyGoogleAccessToken = async (params: {
  token: string;
}): Promise<UserEntity | ErrorResponse> => {
    try {
        let url = `${BASE_URL}/verify-google-access-token`
        url = appendClientIdToQuery(url)!
        const urlInstance = new URL(url)
        urlInstance.searchParams.append("token", params.token)
        url = urlInstance.toString()

        const response = await axios.get(url)
        const { data, tokens } = response.data as ApiResponse<UserEntity>

        saveTokens(tokens)

        return data
    } catch (ex) {
        return (ex as AxiosError).response?.data as ErrorResponse
    }
}