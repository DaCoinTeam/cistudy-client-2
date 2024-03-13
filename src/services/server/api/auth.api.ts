import { API_ENDPOINT } from "@config"
import { baseAxios } from "./axios-instances/base-axios"
import { UserEntity } from "@common"

const BASE_URL = `${API_ENDPOINT}/auth`

export interface SignUpInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthdate: string;
}

export const signUp = async (input: SignUpInput): Promise<string> => {
    const url = `${BASE_URL}/sign-up`
    return await baseAxios.post(url, input)
}

export interface VerifyGoogleAccessTokenInput {
    token: string;
}

export const verifyGoogleAccessToken = async (
    input: VerifyGoogleAccessTokenInput
): Promise<UserEntity> => {
    let url = `${BASE_URL}/verify-google-access-token`
    const urlObject = new URL(url)
    urlObject.searchParams.append("token", input.token)
    url = urlObject.toString()
    return await baseAxios.get(url)
}