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
import axios, { AxiosError, CanceledError } from "axios"
import { ABORTED_MESSAGE, endpointConfig } from "@config"

const BASE_URL = `${endpointConfig().api}/courses`

export const createCourse = async (
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<{
  courseId: string;
}> => {
    try {
        const url = `${BASE_URL}/create-course`

        const response = await axios.post(url, undefined, {
            headers: {
                Authorization: buildBearerTokenHeader(authTokenType),
                "Client-Id": getClientId(),
            },
        })

        const { data: responseData, tokens } = response.data as BaseResponse<{
      courseId: string;
    }>

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
            return await createCourse(AuthTokenType.Refresh)
        throw _ex
    }
}

export const updateCourse = async (
    input: {
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
): Promise<string> => {
    try {
        const { data, files } = input
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
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        )
            return await updateCourse(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const createCourseTarget = async (
    input: {
    data: {
      courseId: string;
      content: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data } = input
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
            return await createCourseTarget(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const updateCourseTarget = async (
    input: {
    data: {
      courseTargetId: string;
      content: string;
    };
    signal?: AbortSignal;
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data, signal } = input
        const url = `${BASE_URL}/update-course-target`

        const response = await axios.put(url, data, {
            headers: {
                Authorization: buildBearerTokenHeader(authTokenType),
                "Client-Id": getClientId(),
            },
            signal,
        })

        const { data: responseData, tokens } =
      response.data as BaseResponse<string>

        if (authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)
        return responseData
    } catch (ex) {
        if (ex instanceof CanceledError) return ABORTED_MESSAGE
        const _ex = (ex as AxiosError).response?.data as ErrorResponse
        const { statusCode } = _ex
        console.log(statusCode)
        if (
            statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        )
            return await updateCourseTarget(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const deleteCourseTarget = async (
    input: {
    data: {
      courseTargetId: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data } = input
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
            return await deleteCourseTarget(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const createLecture = async (
    input: {
    data: {
      sectionId: string;
      title: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data } = input
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
            return await createLecture(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const updateLecture = async (
    input: {
    data: {
      lectureId: string;
      title?: string;
      thumbnailIndex?: number;
      lectureVideoIndex?: number;
    };
    files?: Array<File>;
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data, files } = input
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
            return await updateLecture(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const deleteLecture = async (
    input: {
    data: {
      lectureId: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data } = input
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
            return await deleteLecture(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const createResources = async (
    input: {
    data: {
      lectureId: string;
    };
    files: Array<File>;
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data, files } = input
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
            return await createResources(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const createSection = async (
    input: {
    data: {
      courseId: string;
      title?: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data } = input
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
            return await createSection(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const updateSection = async (
    input: {
    data: {
      sectionId: string;
      title?: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data } = input
        const url = `${BASE_URL}/update-section`

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
            return await updateSection(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const deleteSection = async (
    input: {
    data: {
      sectionId: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data } = input
        const { sectionId } = data
        const url = `${BASE_URL}/delete-section/${sectionId}`
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
            return await deleteSection(input, AuthTokenType.Refresh)
        throw _ex
    }
}

export const deleteResource = async (
    input: {
    data: {
      resourceId: string;
    };
  },
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<string> => {
    try {
        const { data } = input
        const { resourceId } = data
        const url = `${BASE_URL}/delete-resource/${resourceId}`
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
            return await deleteResource(input, AuthTokenType.Refresh)
        throw _ex
    }
}
