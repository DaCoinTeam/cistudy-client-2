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
      courseId: string;
      title?: string;
      description?: string;
      price?: number;
      thumbnailIndex?: number;
      previewVideoIndex?: number;
      targets?: Array<string>;
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

export const createCourseTarget = async (
    params: {
    data: {
      courseId: string;
      content: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data } = params
        const url = `${BASE_URL}/create-course-target`

        const response = await axios.post(url, data, {
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
            return await createCourseTarget(params, AuthTokenType.Refresh)
        return _ex
    }
}

export const updateCourseTarget = async (
    params: {
    data: {
      courseTargetId: string;
      content: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data } = params
        const url = `${BASE_URL}/update-course-target`

        const response = await axios.put(url, data, {
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
            return await updateCourseTarget(params, AuthTokenType.Refresh)
        return _ex
    }
}

export const deleteCourseTarget = async (
    params: {
    data: {
      courseTargetId: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data } = params
        const { courseTargetId } = data
        const url = `${BASE_URL}/delete-course-target/${courseTargetId}`
        //

        const response = await axios.delete(url, {
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
            return await deleteCourseTarget(params, AuthTokenType.Refresh)
        return _ex
    }
}

export const createLecture = async (
    params: {
    data: {
      sectionId: string;
      title: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data } = params
        const url = `${BASE_URL}/create-lecture`

        const response = await axios.post(url, data, {
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
            return await createLecture(params, AuthTokenType.Refresh)
        return _ex
    }
}

export const updateLecture = async (
    params: {
    data: {
      lectureId: string;
      title?: string;
      thumbnailIndex?: number;
      lectureVideoIndex?: number;
    };
    files?: Array<File>;
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data, files } = params
        const url = `${BASE_URL}/update-lecture`
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
            return await updateLecture(params, AuthTokenType.Refresh)
        return _ex
    }
}

export const deleteLecture = async (
    params: {
    data: {
      lectureId: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data } = params
        const { lectureId } = data
        const url = `${BASE_URL}/delete-lecture/${lectureId}`
        //

        const response = await axios.delete(url, {
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
            return await deleteLecture(params, AuthTokenType.Refresh)
        return _ex
    }
}

export const createResources = async (
    params: {
    data: {
      lectureId: string;
    };
    files: Array<File>;
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data, files } = params
        const url = `${BASE_URL}/create-resources`
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
            return await createResources(params, AuthTokenType.Refresh)
        return _ex
    }
}

export const createSection = async (
    params: {
    data: {
      courseId: string;
      title?: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string | ErrorResponse> => {
    try {
        const { data } = params
        const url = `${BASE_URL}/create-section`

        const response = await axios.post(url, data, {
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
            return await createSection(params, AuthTokenType.Refresh)
        return _ex
    }
}
