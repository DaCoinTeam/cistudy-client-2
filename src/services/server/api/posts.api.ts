import { MediaType } from "@common"
import { ENDPOINT_API } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${ENDPOINT_API}/posts`

export interface CreatePostInput {
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

export interface CreatePostOutput { }

export const createPost = async (input: CreatePostInput): Promise<CreatePostOutput> => {
    const { data, files } = input
    const url = `${BASE_URL}/create-post`

    const formData = new FormData()
    formData.append("data", JSON.stringify(data))

    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export interface UpdatePostInput {
    data: {
        postId: string;
        title?: string;
        html?: string;
        postMedias?: Array<{
            mediaType: MediaType;
            mediaIndex: number;
        }>;
    };
    files?: Array<File>;
}

export interface UpdatePostOutput { }

export const updatePost = async (input: UpdatePostInput): Promise<CreatePostOutput> => {
    const { data, files } = input
    const url = `${BASE_URL}/update-post`

    const formData = new FormData()
    formData.append("data", JSON.stringify(data))

    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.put(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export interface DeletePostInput {
    data: {
        postId: string;
    };
}
export interface DeletePostOutput { }

export const deletePost = async (
    input: DeletePostInput
): Promise<DeletePostOutput> => {
    const { data } = input
    const { postId } = data
    const url = `${BASE_URL}/delete-post/${postId}`
    return await authAxios.delete(url)
}


export interface CreatePostCommentInput {
    data: {
        postId: string;
        html: string;
        postCommentMedias: Array<{
            mediaType: MediaType;
            mediaIndex: number;
        }>;
    };
    files?: Array<File>;
}

export interface CreatePostCommentOutput { }

export const createPostComment = async (
    input: CreatePostCommentInput
): Promise<CreatePostCommentOutput> => {
    const { data, files } = input
    const url = `${BASE_URL}/create-post-comment`

    const formData = new FormData()
    formData.append("data", JSON.stringify(data))

    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export interface UpdatePostCommentInput {
    data: {
        postCommentId: string;
        html: string;
        postCommentMedias: Array<{
            mediaType: MediaType;
            mediaIndex: number;
        }>;
    };
    files?: Array<File>;
}

export interface UpdatePostCommentOutput { }

export const updatePostComment = async (
    input: UpdatePostCommentInput
): Promise<UpdatePostCommentOutput> => {
    const { data, files } = input
    const url = `${BASE_URL}/update-post-comment`

    const formData = new FormData()
    formData.append("data", JSON.stringify(data))

    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.put(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export interface DeletePostCommentInput {
    data: {
        postCommentId: string;
    };
}
export interface DeletePostCommentOutput { }

export const deletePostComment = async (
    input: DeletePostCommentInput
): Promise<DeletePostCommentOutput> => {
    const { data } = input
    const { postCommentId } = data
    const url = `${BASE_URL}/delete-post-comment/${postCommentId}`
    return await authAxios.delete(url)
}

export interface ToggleLikePostInput {
    data: {
        postId: string;
    };
}
export interface ToggleLikePostOutput { }
export const toggleLikePost = async (
    input: ToggleLikePostInput
): Promise<ToggleLikePostOutput> => {
    const { data } = input
    const url = `${BASE_URL}/toggle-like-post`
    return await authAxios.patch(url, data)
}

export interface ToggleLikePostCommentInput {
    data: {
        postCommentId: string;
    };
}
export interface ToggleLikePostCommentOutput { }
export const toggleLikePostComment = async (
    input: ToggleLikePostCommentInput
): Promise<ToggleLikePostCommentOutput> => {
    const { data } = input
    const url = `${BASE_URL}/toggle-like-post-comment`
    return await authAxios.patch(url, data)
}

export interface CreatePostCommentReplyInput {
    data: {
        postCommentId: string;
        content: string;
    };
}
export interface CreatePostCommentReplyOutput {
    postCommentReplyId: string;
}
export const createPostCommentReply = async (
    input: CreatePostCommentReplyInput
): Promise<CreatePostCommentReplyOutput> => {
    const { data } = input
    const url = `${BASE_URL}/create-post-comment-reply`
    return await authAxios.post(url, data)
}

export interface UpdatePostCommentReplyInput {
    data: {
        postCommentReplyId: string;
        content: string;
    };
}
export interface UpdatePostCommentReplyOutput { }
export const updatePostCommentReply = async (
    input: UpdatePostCommentReplyInput
): Promise<UpdatePostCommentReplyOutput> => {
    const { data } = input
    const url = `${BASE_URL}/update-post-comment-reply`
    return await authAxios.put(url, data)
}

export interface DeletePostCommentReplyInput {
    data: {
        postCommentReplyId: string;
    };
}
export interface DeletePostCommentReplyOutput { }
export const deletePostCommentReply = async (
    input: DeletePostCommentReplyInput
): Promise<DeletePostCommentReplyOutput> => {
    const { data } = input
    const { postCommentReplyId } = data
    const url = `${BASE_URL}/delete-post-comment-reply/${postCommentReplyId}`
    return await authAxios.delete(url)
}



