import { ENDPOINT_API } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${ENDPOINT_API}/profile`

export interface UpdateProfileInput {
    data: {
        username?: string;
        birthdate?: string;
        avatarIndex?: number;
        coverPhotoIndex?: number;
        walletAddress?: string;
    };
    files?: Array<File>;
}

export const updateProfile = async (
    input: UpdateProfileInput
): Promise<string> => {
    const { data, files } = input
    const url = `${BASE_URL}/update-profile`
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))
    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.put(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export interface WithdrawInput {
    data: {
      withdrawAmount: number
    };
  }
  
export const withdraw = async (
    input: WithdrawInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/withdraw`
  
    return await authAxios.patch(url, data)
}
  