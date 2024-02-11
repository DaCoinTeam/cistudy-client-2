import { endpointConfig } from "@config"
import {
    ApiResponse,
    AuthTokenType,
    ErrorResponse,
    ErrorStatusCode,
    buildBearerTokenHeader,
    appendClientIdToQuery,
    saveTokens,
} from "@services/shared"
import axios, { AxiosError } from "axios"

const BASE_URL = `${endpointConfig().api}/profile`

export const updateCoverPhoto = async (
    file: File,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        let url = `${BASE_URL}/update-cover-photo`
        url = appendClientIdToQuery(url)!

        const formData = new FormData()

        formData.append("files", file)

        const response = await axios.patch(url, formData, {
            headers: {
                Authorization: buildBearerTokenHeader(authTokenType),
                "Content-Type": "multipart/form-data",
            },
        })

        const { data, tokens } = response.data as ApiResponse<string>

        if (authTokenType === AuthTokenType.Refresh) saveTokens(tokens)

        return data
    } catch (ex) {
        const _ex = (ex as AxiosError).response?.data as ErrorResponse
        const { statusCode } = _ex
        console.log(statusCode)
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        ) {
            return await updateCoverPhoto(file, AuthTokenType.Refresh)
        }
        return _ex
    }
}

export const updateAvatar = async (
    file: File,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        let url = `${BASE_URL}/update-avatar`
        url = appendClientIdToQuery(url)!

        const formData = new FormData()

        formData.append("files", file)

        const response = await axios.patch(url, formData, {
            headers: {
                Authorization: buildBearerTokenHeader(authTokenType),
                "Content-Type": "multipart/form-data",
            },
        })

        const { data, tokens } = response.data as ApiResponse<string>

        if (authTokenType === AuthTokenType.Refresh) saveTokens(tokens)

        return data
    } catch (ex) {
        const _ex = (ex as AxiosError).response?.data as ErrorResponse
        const { statusCode } = _ex
        console.log(statusCode)
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        ) {
            return await updateAvatar(file, AuthTokenType.Refresh)
        }
        return _ex
    }
}