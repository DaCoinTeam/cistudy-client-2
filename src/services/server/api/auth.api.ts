import { endpointConfig } from "@config"

import {
    UserEntity,
    ErrorResponse,
    saveTokens,
    BaseResponse,
    getClientId,
    AuthTokens,
} from "@common"

import axios, { AxiosError } from "axios"

const BASE_URL = `${endpointConfig().api}/auth`

export const signUp = async (input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string;
}): Promise<string> => {
    try {
        const url = `${BASE_URL}/sign-up`
        const response = await axios.post(url, input, {
            headers: {
                "Client-Id": getClientId(),
            },
        })
        return response.data as string
    } catch (ex) {
        throw (ex as AxiosError).response?.data as ErrorResponse
    }
}

export const verifyGoogleAccessToken = async (input: {
  token: string;
}): Promise<UserEntity> => {
    try {
        let url = `${BASE_URL}/verify-google-access-token`
        const urlObject = new URL(url)
        urlObject.searchParams.append("token", input.token)
        url = urlObject.toString()

        const response = await axios.get(url, {
            headers: {
                "Client-Id": getClientId(),
            },
        })
        const { data, tokens } = response.data as BaseResponse<UserEntity>
        saveTokens(tokens as AuthTokens)

        return data
    } catch (ex) {
        throw (ex as AxiosError).response?.data as ErrorResponse
    }
}
