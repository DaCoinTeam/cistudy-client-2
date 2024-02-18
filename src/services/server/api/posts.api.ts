import {
    AuthTokenType,
    AuthTokens,
    BaseResponse,
    ContentType,
    ErrorResponse,
    ErrorStatusCode,
    buildBearerTokenHeader,
    getClientId,
    saveTokens,
} from "@common"
import axios, { AxiosError } from "axios"
import { endpointConfig } from "@config"

const BASE_URL = `${endpointConfig().api}/posts`

export const createPost = async (
    params: {
    data: {
      title: string;
      courseId: string;
      postContents: Array<{
        contentType: ContentType,
        text?: string,
        postContentMedias?: Array<{
            mediaIndex: number
        }>
      }>
    };
    files?: Array<File>;
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    console.log(params)
    try {
        const { data, files } = params
        const url = `${BASE_URL}/create-post`
        const formData = new FormData()

        formData.append("data", JSON.stringify(data))
        if (files) {
            for (const file of files) {
                formData.append("files", file)
            }
        }

        const response = await axios.post(url, formData, {
            headers: {
                Authorization: buildBearerTokenHeader(authTokenType),
                "Content-Type": "multipart/form-data",
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
            return await createPost(params, AuthTokenType.Refresh)
        return _ex
    }
}