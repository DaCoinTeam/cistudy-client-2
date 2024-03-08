import { endpointConfig } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${endpointConfig().api}/users`

export interface ToggleFollowInput {
    data: {
        followedUserId: string;
    };
}

export const toggleFollow = async (
    input: ToggleFollowInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/toggle-follow`

    return await authAxios.patch(url, data)
}