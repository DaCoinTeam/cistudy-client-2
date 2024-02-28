import { endpointConfig } from "@config"

import {
    ErrorResponse,
    saveTokens,
    BaseResponse,
    getClientId,
    AuthTokens,
    AuthTokenType,
    ErrorStatusCode,
    buildBearerTokenHeader,
} from "@common"

import axios, { AxiosError } from "axios"

const BASE_URL = `${endpointConfig().api}/users`

export const followOrUnfollow = async (
    params: {
    data: {
      followedUserId: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data } = params
        const url = `${BASE_URL}/follow-or-unfollow`

        const response = await axios.patch(url, data, {
            headers: {
                Authorization: buildBearerTokenHeader(authTokenType),
                "Client-Id": getClientId(),
            },
        })

        const { data: responseData, tokens } =
      response.data as BaseResponse<string>

        if (authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)
        return responseData
    } catch (ex) {
        const _ex = (ex as AxiosError).response?.data as ErrorResponse
        const { statusCode } = _ex
        console.log(statusCode)
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        )
            return await followOrUnfollow(params, AuthTokenType.Refresh)
        return _ex
    }
}
