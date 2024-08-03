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

export interface UpdateProfileOutput {
  message: string,
}

export const updateProfile = async (
    input: UpdateProfileInput
): Promise<UpdateProfileOutput> => {
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
    withdrawAmount: number;
  };
}

export interface WithdrawOutput {
  message: string;
}

export const withdraw = async (
    input: WithdrawInput
): Promise<WithdrawOutput> => {
    const { data } = input
    const url = `${BASE_URL}/withdraw`

    return await authAxios.patch(url, data)
}

export interface DepositInput {
  data: {
    transactionHash: string;
    maxQueries?: number;
    queryIntervalMs?: number;
  };
}

export interface DepositOutput {
  message: string;
}

export const deposit = async (input: DepositInput): Promise<DepositOutput> => {
    const { data } = input
    const url = `${BASE_URL}/deposit`

    return await authAxios.patch(url, data)
}

export interface MarkNotificationAsReadInput {
  data: {
    notificationIds: Array<string>
  }
}

export interface MarkNotificationAsReadOutput {
  message: string
}

export const markNotificationAsRead = async (
    input: MarkNotificationAsReadInput
): Promise<MarkNotificationAsReadOutput> => {
    const {data} = input
    const url = `${BASE_URL}/mark-notification-as-read`
    return await authAxios.patch(url, data)
}