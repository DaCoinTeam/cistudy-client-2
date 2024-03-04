import { endpointConfig } from "@config"
import { v4 as uuidv4} from "uuid"

const BASE_URL = `${endpointConfig().api}/assets`

interface GetAssetOptions {
    forceUpdate: boolean
}
export const getAssetUrl = (assetIdOrPath?: string, options?: Partial<GetAssetOptions>) => {
    let url =  assetIdOrPath ? `${BASE_URL}/get-asset/${assetIdOrPath}` : undefined
    if (options?.forceUpdate) url = `${url}?${uuidv4()}`
    return url
}
   

export const getAssetManifestUrl = (assetIdOrPath?: string) =>
    assetIdOrPath
        ? `${BASE_URL}/get-asset/${assetIdOrPath}/manifest.mpd`
        : undefined
