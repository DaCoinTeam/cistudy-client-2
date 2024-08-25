import { ENDPOINT_API } from "@config"
import { authAxios } from "./axios-instances"
import { ReportProcessStatus } from "@common"

const BASE_URL = `${ENDPOINT_API}`

export interface resolveAccountReportInput {
  data: {
    reportAccountId: string;
    processStatus: ReportProcessStatus;
    processNote: string;
  };
}

export const resolveAccountReport = async (
    input: resolveAccountReportInput
): Promise<string> => {
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

export const resolveCourseReport = async (
    input: resolveCourseReportInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/courses/resolve-course-report`

    return await authAxios.patch(url, data)
}

export interface ResolvePostReportInput {
  data: {
    reportPostId: string;
    processStatus: string;
    processNote: string;
  };
}

export interface ResolvePostReportOutput {
  message: string;
}

export const resolvePostReport = async (
    input: ResolvePostReportInput
): Promise<ResolvePostReportOutput> => {
    const { data } = input
    const url = `${BASE_URL}/posts/resolve-post-report`

    return await authAxios.patch(url, data)
}

export interface ResolvePostCommentReportInput {
  data: {
    reportPostCommentId: string;
    processStatus: string;
    processNote: string;
  };
}

export interface ResolvePostCommentReportOutput {
  message: string;
}

export const resolvePostCommentReport = async (
    input: ResolvePostCommentReportInput
): Promise<ResolvePostCommentReportOutput> => {
    const { data } = input
    const url = `${BASE_URL}/posts/resolve-post-comment-report`

    return await authAxios.patch(url, data)
}

export interface CreateAccountReportInputData {
  data: {
    reportedId: string;
    title: string;
    description: string;
  };
}
export interface CreateAccountReportOutputData {
  message: string;
  others: {
    reportAccountId: string;
  };
}

export const createAccountReport = async (
    input: CreateAccountReportInputData
): Promise<CreateAccountReportOutputData> => {
    const { data } = input
    const url = `${BASE_URL}/accounts/create-account-report`
    return await authAxios.post(url, data)
}

export interface CreatePostReportInputData {
  data: {
    postId: string;
    title: string;
    description: string;
  };
}
export interface CreatePostReportOutputData {
  message: string;
  others: {
    reportPostId: string;
  };
}

export const createPostReport = async (
    input: CreatePostReportInputData
): Promise<CreatePostReportOutputData> => {
    const { data } = input
    const url = `${BASE_URL}/posts/create-post-report`
    return await authAxios.post(url, data)
}

export interface CreatePostCommentReportInputData {
  data: {
    postCommentId: string;
    title: string;
    description: string;
  };
}
export interface CreatePostCommentReportOutputData {
  message: string;
  others: {
    reportPostCommentId: string;
  };
}

export const createPostCommentReport = async (
    input: CreatePostCommentReportInputData
): Promise<CreatePostCommentReportOutputData> => {
    const { data } = input
    const url = `${BASE_URL}/posts/create-post-comment-report`
    return await authAxios.post(url, data)
}
