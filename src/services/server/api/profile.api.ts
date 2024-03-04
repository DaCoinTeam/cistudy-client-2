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

export const updateProfile = async (
    params: {
        data: {
            username?: string,
            avatarIndex?: number,
            coverPhotoIndex?: number
        }
        files?: Array<File>,
    },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data, files } = params
        const url = `${BASE_URL}/update-profile`
        const formData = new FormData()

        formData.append("data", JSON.stringify(data))
        if (files){
            for (const file of files){
                formData.append("files", file)
            }
        }
       
        const response = await axios.put(url, formData, {
            headers: {
                Authorization: buildBearerTokenHeader(authTokenType),
                "Content-Type": "multipart/form-data",
                "Client-Id": getClientId()
            },
        })

        const { data : responseData, tokens } = response.data as BaseResponse<string>

        if (authTokenType === AuthTokenType.Refresh) saveTokens(tokens as AuthTokens)
        return responseData
    } catch (ex) {
        const _ex = (ex as AxiosError).response?.data as ErrorResponse
        const { statusCode } = _ex
        console.log(statusCode)
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        ) return await updateProfile(params, AuthTokenType.Refresh)
        return _ex
    }
}