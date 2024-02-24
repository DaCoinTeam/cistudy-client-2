import {
    AuthTokenType,
    AuthTokens,
    BaseResponse,
    ErrorResponse,
    ErrorStatusCode,
    MediaType,
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
            html: string;
            postMedias: Array<{
                mediaType: MediaType;
                mediaIndex: number;
            }>;
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

export const createComment = async (
    params: {
        data: {
            postId: string;
            html: string;
            postCommentMedias: Array<{
                mediaType: MediaType;
                mediaIndex: number;
            }>;
        };
        files?: Array<File>;
    },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    console.log(params)
    try {
        const { data, files } = params
        const url = `${BASE_URL}/create-comment`
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
            return await createComment(params, AuthTokenType.Refresh)
        return _ex
    }
}

export const reactPost = async (
    params: {
        data: {
            postId: string;
        };
    },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data } = params
        const url = `${BASE_URL}/react-post`

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
            return await reactPost(params, AuthTokenType.Refresh)
        return _ex
    }
}
