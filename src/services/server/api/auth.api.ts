import { ENDPOINT_API } from "@config"
import { baseAxios } from "./axios-instances"

const BASE_URL = `${ENDPOINT_API}/auth`

export interface SignInInput {
    email: string;
    password: string;
}

export const signIn = async (input: SignInInput): Promise<string> => {
    const url = `${BASE_URL}/sign-in`
    return await baseAxios.post(url, input)
}

export interface SignUpInput {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    birthdate: string;
}

export interface SignUpOutput {
    message: string;
}

export const signUp = async (input: SignUpInput): Promise<SignUpOutput> => {
    const url = `${BASE_URL}/sign-up`
    return await baseAxios.post(url, input)
}

export interface VerifyGoogleAccessTokenInput {
    token: string;
}

export interface VerifyRegistrationInput {
  token: string;
}

export const verifyRegistration = async (input: VerifyRegistrationInput): Promise<string> => {
    const url = `${BASE_URL}/verify-registration`
    return await baseAxios.patch(url, input)
}
