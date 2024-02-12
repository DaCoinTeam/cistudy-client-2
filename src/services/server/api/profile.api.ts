import { endpointConfig } from "@config"
import {
    BaseResponse,
    AuthTokenType,
    ErrorResponse,
    ErrorStatusCode,
    buildBearerTokenHeader,
    saveTokens,
    getClientId,
    AuthTokens,
} from "@common"

import axios, { AxiosError } from "axios"

const BASE_URL = `${endpointConfig().api}/profile`

export const updateCoverPhoto = async (
    file: File,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const url = `${BASE_URL}/update-cover-photo`

        const formData = new FormData()
        formData.append("files", file)

        const response = await axios.patch(url, formData, {
            headers: {
                Authorization: buildBearerTokenHeader(authTokenType),
                "Content-Type": "multipart/form-data",
                "Client-Id": getClientId()
            },
        })

        const { data, tokens } = response.data as BaseResponse<string>

        if (authTokenType === AuthTokenType.Refresh) saveTokens(tokens as AuthTokens)

        return data
    } catch (ex) {
        const _ex = (ex as AxiosError).response?.data as ErrorResponse
        const { statusCode } = _ex
        console.log(statusCode)
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        ) return await updateCoverPhoto(file, AuthTokenType.Refresh)  
        return _ex
    }
}

export const updateAvatar = async (
    file: File,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const url = `${BASE_URL}/update-avatar`
        const formData = new FormData()

        formData.append("files", file)

        const response = await axios.patch(url, formData, {
            headers: {
                Authorization: buildBearerTokenHeader(authTokenType),
                "Content-Type": "multipart/form-data",
                "Client-Id": getClientId()
            },
        })

        const { data, tokens } = response.data as BaseResponse<string>

        if (authTokenType === AuthTokenType.Refresh) saveTokens(tokens as AuthTokens)
        return data
    } catch (ex) {
        const _ex = (ex as AxiosError).response?.data as ErrorResponse
        const { statusCode } = _ex
        console.log(statusCode)
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        ) return await updateAvatar(file, AuthTokenType.Refresh)
        return _ex
    }
}