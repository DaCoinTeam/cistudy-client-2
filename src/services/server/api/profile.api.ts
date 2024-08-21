import { ENDPOINT_API } from "@config"
import { authAxios, baseAxios } from "./axios-instances"

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

export interface MarkAllNotificationsAsReadOutput {
  message: string
}

export const markAllNotificationsAsRead = async (): Promise<MarkAllNotificationsAsReadOutput> => {
    const url = `${BASE_URL}/mark-all-notifications-as-read`
    return await authAxios.patch(url)
}

export interface IsSastifyCommunityStandardInput {
  message: string,
  signal?: AbortSignal;
}

export interface IsSastifyCommunityStandardOutput {
  result: boolean
  reason?: string
}

export const isSastifyCommunityStandard = async (
    input: IsSastifyCommunityStandardInput
): Promise<IsSastifyCommunityStandardOutput> => {
    const {message, signal } = input
    const url = `${BASE_URL}/is-sastify-community-standard`
    return await baseAxios.post(url, { message }, {
        signal
    })
}

export interface AddJobInput {
  data: {
    companyName: string
    role: string
    companyThumbnailIndex: number
    startDate: string
    endDate: string
  }

  files?: Array<File>
}

export interface AddJobOutput {
  message: string
}

export const addJob = async (
    input: AddJobInput
): Promise<AddJobOutput> => {
    const { data, files } = input
    const url = `${BASE_URL}/add-job`
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))
    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export interface UpdateAccountJobInput {
  data: {
    accountJobId: string
    companyName: string
    role: string
    companyThumbnailIndex: number
    startDate: string
    endDate: string
  }

  files?: Array<File>
}

export interface UpdateAccountJobOutput {
  message: string
}

export const updateAccountJob = async (
    input: UpdateAccountJobInput
): Promise<UpdateAccountJobOutput> => {
    const { data, files } = input
    const url = `${BASE_URL}/update-account-job`
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

export interface DeleteJobInput {
  accountJobId: string
}

export interface DeleteJobOutput {
  message: string
}

export const deleteJob = async (
    input: DeleteJobInput
): Promise<DeleteJobOutput> => {
    const { accountJobId } = input
    const url = `${BASE_URL}/delete-job/${accountJobId}`

    return await authAxios.delete(url)
}

export interface AddQualificationInput {
  data: {
    name: string
    issuedFrom: string
    issuedAt: string
    url?: string
  },
  files?: Array<File>
}

export interface AddQualificationOutput {
  message: string
}

export const addQualification = async (
    input: AddQualificationInput
): Promise<AddQualificationOutput> => {
    const { files, data } = input
    const url = `${BASE_URL}/add-qualification`
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))

    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export interface DeleteQualificationInput {
  accountQualificationId: string
}

export interface DeleteQualificationOutput {
  message: string
}

export const deleteQualification = async (
    input: DeleteQualificationInput
): Promise<DeleteQualificationOutput> => {
    const { accountQualificationId } = input
    const url = `${BASE_URL}/delete-qualification/${accountQualificationId}`

    return await authAxios.delete(url)
}

export interface registerInstructorInput {

}

export interface registerInstructorOutput {
  message: string
}

export const registerInstructor = async (

): Promise<registerInstructorOutput> => {
    const url = `${BASE_URL}/register-instructor`

    return await authAxios.patch(url)
}