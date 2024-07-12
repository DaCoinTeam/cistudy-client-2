import { ENDPOINT_API } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${ENDPOINT_API}`

export interface resolveAccountReportInput {
    data: {
        reportAccountId: string;
        processStatus: string;
        processNote: string;
    };
}

export const resolveAccountReport = async (input : resolveAccountReportInput): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/accounts/resolve-account-report`

    return await authAxios.patch(url, data)
}

export interface resolveCourseReportInput {
    data: {
        reportCourseId: string;
        processStatus: string;
        processNote: string;
    };
}

export const resolveCourseReport = async (input : resolveCourseReportInput): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/courses/resolve-course-report`

    return await authAxios.patch(url, data)
}

export interface resolvePostReportInput {
    data: {
        reportPostId: string;
        processStatus: string;
        processNote: string;
    };
}

export const resolvePostReport = async (input : resolvePostReportInput): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/posts/resolve-post-report`

    return await authAxios.patch(url, data)
}

export interface resolvePostCommentReportInput {
    data: {
        reportPostCommentId: string;
        processStatus: string;
        processNote: string;
    };
}

export const resolvePostCommentReport = async (input : resolvePostCommentReportInput): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/posts/resolve-post-comment-report`

    return await authAxios.patch(url, data)
}
