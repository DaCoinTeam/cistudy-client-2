import { ENDPOINT_API } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${ENDPOINT_API}/accounts`

export interface ToggleFollowInput {
    data: {
        followedAccountId: string;
    };
}

export const toggleFollow = async (
    input: ToggleFollowInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/toggle-follow`

    return await authAxios.patch(url, data)
}

export interface VerifyCourseInput {
    data: {
      courseId: string
      note: string
      verifyStatus: string
    }
}

export interface VerifyCourseOutput {
    message: string
}
  
export const verifyCourse = async (
    input : VerifyCourseInput
): Promise<VerifyCourseOutput> => {
    const {data} = input
    const url = `${BASE_URL}/verify-course`
    return await authAxios.patch(url, data)
}