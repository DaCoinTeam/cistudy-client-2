import {
    AuthTokenType,
    AuthTokens,
    BaseResponse,
    ErrorResponse,
    ErrorStatusCode,
    buildBearerTokenHeader,
    getClientId,
    saveTokens,
} from "@common"
import axios, { AxiosError } from "axios"
import { endpointConfig } from "@config"

const BASE_URL = `${endpointConfig().api}/courses`

export const updateCourse = async (
    params: {
    data: {
      courseId?: string;
      title?: string;
      description?: string;
      price?: number;
      thumbnailIndex?: number;
      previewVideoIndex?: number;
      targets?: Array<string>
    };
    files?: Array<File>;
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data, files } = params
        const url = `${BASE_URL}/update-course`
        const formData = new FormData()

        formData.append("data", JSON.stringify(data))
        if (files) {
            for (const file of files) {
                formData.append("files", file)
            }
        }

        const response = await axios.put(url, formData, {
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
            return await updateCourse(params, AuthTokenType.Refresh)
        return _ex
    }
}
