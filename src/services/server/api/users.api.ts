import { endpointConfig } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${endpointConfig().api}/users`

export const toggleFollow = async (
    input: {
        data: {
            followedUserId: string;
        };
    }
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/toggle-follow`

    return await authAxios.patch(url, data)
}
