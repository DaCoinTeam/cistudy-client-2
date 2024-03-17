import { API_ENDPOINT } from "@config"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

const BASE_URL = `${API_ENDPOINT}/assets`

interface GetAssetOptions {
    forceUpdate: boolean;
}
export const getAssetUrl = (
    assetIdOrPath?: string,
    options?: Partial<GetAssetOptions>
) => {
    let url = assetIdOrPath
        ? `${BASE_URL}/get-asset/${assetIdOrPath}`
        : undefined
    if (options?.forceUpdate) url = `${url}?${uuidv4()}`
    return url
}

export const getAssetManifestUrl = (assetIdOrPath?: string) =>
    assetIdOrPath
        ? `${BASE_URL}/get-asset/${assetIdOrPath}/manifest.mpd`
        : undefined

export const getAssetFile = async (
    assetIdOrPath: string
): Promise<File | null> => {
    try {
        const response = await axios.get(getAssetUrl(assetIdOrPath) as string, {
            responseType: "blob",
        })
        const filename = uuidv4()
        return new File([response.data], filename, {
            type: response.headers["content-type"],
        })
    } catch (ex) {
        return null
    }
}
