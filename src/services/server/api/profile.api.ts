import { endpointConfig } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${endpointConfig().api}/profile`

export const updateProfile = async (
    input: {
        data: {
            username?: string,
            avatarIndex?: number,
            coverPhotoIndex?: number
        }
        files?: Array<File>,
    },
): Promise<string> => {
    const { data, files } = input
    const url = `${BASE_URL}/update-profile`
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))
    if (files){
        for (const file of files){
            formData.append("files", file)
        }
    }
       
    return await authAxios.put(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}