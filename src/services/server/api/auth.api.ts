import { API_ENDPOINT } from "@config"
import { baseAxios } from "./axios-instances"

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