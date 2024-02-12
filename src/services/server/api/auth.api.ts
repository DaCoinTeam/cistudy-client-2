import { endpointConfig } from "@config"

import {
    UserEntity,
    ErrorResponse,
    saveTokens,
    ApiResponse,
    getClientId,
} from "@common"

import axios, { AxiosError } from "axios"

const BASE_URL = `${endpointConfig().api}/auth`

export const signIn = async (params: {
  email: string;
  password: string;
}): Promise<UserEntity | ErrorResponse> => {
    try {
        const url = `${BASE_URL}/sign-in`

        const response = await axios.post(url, params, {
            headers: {
                "Client-Id": getClientId(),
            },
        })
        const { data, tokens } = response.data as ApiResponse<UserEntity>

        saveTokens(tokens)

        return data
    } catch (ex) {
        return (ex as AxiosError).response?.data as ErrorResponse
    }
}

export const signUp = async (params: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
}): Promise<string | ErrorResponse> => {
    try {
        const url = `${BASE_URL}/sign-up`
        const response = await axios.post(url, params, {
            headers: {
                "Client-Id": getClientId(),
            },
        })
        return response.data as string
    } catch (ex) {
        return (ex as AxiosError).response?.data as ErrorResponse
    }
}

export const verifyGoogleAccessToken = async (params: {
  token: string;
}): Promise<UserEntity | ErrorResponse> => {
    try {
        let url = `${BASE_URL}/verify-google-access-token`
        const urlObject = new URL(url)
        urlObject.searchParams.append("token", params.token)
        url = urlObject.toString()

        const response = await axios.get(url, {
            headers: {
                "Client-Id": getClientId(),
            },
        })
        const { data, tokens } = response.data as ApiResponse<UserEntity>

        saveTokens(tokens)

        return data
    } catch (ex) {
        return (ex as AxiosError).response?.data as ErrorResponse
    }
}
