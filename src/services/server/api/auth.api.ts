import { endpointConfig } from "@config"

import { baseAxios } from "./axios-instances/base-axios"
import { UserEntity } from "@common"

const BASE_URL = `${endpointConfig().api}/auth`

export const signUp = async (input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string;
}): Promise<string> => {
    const url = `${BASE_URL}/sign-up`
    return await baseAxios.post(url, input)
}

export const verifyGoogleAccessToken = async (input: {
  token: string;
}): Promise<UserEntity> => {
    let url = `${BASE_URL}/verify-google-access-token`
    const urlObject = new URL(url)
    urlObject.searchParams.append("token", input.token)
    url = urlObject.toString()
    return await baseAxios.get(url)
}
