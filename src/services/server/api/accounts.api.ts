import { ENDPOINT_API } from "@config"
import { authAxios } from "./axios-instances"
import { SystemRoles } from "@common"

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

export interface CreateConfigurationInput {
    data: {
        instructor: number
        earn: number
        completed: number
        foundation: number
    }
}

export interface CreateConfigurationOutput {
    message: string
}
  
export const createConfiguration = async (
    input : CreateConfigurationInput
): Promise<CreateConfigurationOutput> => {
    const {data} = input
    const url = `${BASE_URL}/create-configuration`
    return await authAxios.post(url, data)
}

export interface UpdateAccountInput {
    data: {
        accountId: string
        username?: string
        firstName?: string
        lastName?: string
        birthdate?: string
        roles?: Array<SystemRoles>
        isDisabled?: boolean
    }
}

export interface UpdateAccountOutput {
    message: string
}
  
export const updateAccount = async (
    input : UpdateAccountInput
): Promise<UpdateAccountOutput> => {
    const {data} = input
    const url = `${BASE_URL}/update-account`
    return await authAxios.put(url, data)
}

export interface CreateAccountInput {
    data: {
        email: string
        username?: string
        firstName?: string
        lastName?: string
        birthdate?: string
        roles?: Array<SystemRoles>
    }
}

export interface CreateAccountOutput {
    message: string
}
  
export const createAccount = async (
    input : CreateAccountInput
): Promise<CreateAccountOutput> => {
    const {data} = input
    const url = `${BASE_URL}/create-account`
    return await authAxios.post(url, data)
}

export interface verifyInstructorInput {
    data: {
        instructorId: string
        verifyStatus: string
        note: string
    }
}

export interface verifyInstructorOutput {
    message: string
}

export const verifyInstructor = async (
    input: verifyInstructorInput
): Promise<verifyInstructorOutput> => {
    const { data } = input
    const url = `${BASE_URL}/verify-instructor`
    return await authAxios.patch(url, data)
}