import axios, { AxiosError, AxiosHeaders } from "axios"
import {
    getClientId,
    ErrorResponse,
    saveTokens,
    AuthTokens,
} from "@common"

export const baseAxios = axios.create()

baseAxios.interceptors.request.use(
    (config) => {
        const headers = new AxiosHeaders({
            ...config.headers,
            "Client-Id": getClientId(),
        })
        return {
            ...config,
            headers,
        }
    },
    (ex) => {
        return Promise.reject(ex)
    }
)

baseAxios.interceptors.response.use(
    async (response) => {
        const { data, tokens } = response.data
        if (tokens)
            saveTokens(tokens as AuthTokens)
        return data
    },
    async (ex: AxiosError) => {
        console.log(ex.response)
        throw ex.response?.data as ErrorResponse
    }
)