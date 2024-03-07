import {
    BaseResponse,
    MediaType,
} from "@common"

import { endpointConfig } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${endpointConfig().api}/posts`

export const createPost = async (
    input: {
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
    }
): Promise<string> => {
    const { data, files } = input
    const url = `${BASE_URL}/create-post`
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))
    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }
    const { data : responseData } = await authAxios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return responseData
}

export const createComment = async (
    input: {
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
): Promise<string> => {
    const { data, files } = input
    const url = `${BASE_URL}/create-comment`
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }
    const response = await authAxios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    const { data: responseData } =
            response.data as BaseResponse<string>
    return responseData
}

export const toggleLikePost = async (
    input: {
        data: {
            postId: string;
        };
    },
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/toggle-like-post`
    return await authAxios.patch(url, data)
}

export const toggleLikePostComment = async (
    input: {
        data: {
            postCommentId: string;
        };
    }
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/toggle-like-post-comment`
    return await authAxios.patch(url, data)
}

export const createPostCommentReply = async (
    input: {
        data: {
            postCommentId: string,
            content: string
        };
    }
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/create-post-comment-reply`
    const response = await authAxios.post(url, data)
    const { data: responseData } =
            response.data as BaseResponse<string>
    return responseData
}
