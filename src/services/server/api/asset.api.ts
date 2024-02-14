import { endpointConfig } from "@config"

const BASE_URL = `${endpointConfig().api}/assets`

export const getAssetUrl = (assetIdOrPath?: string) =>
    assetIdOrPath ? `${BASE_URL}/get-asset/${assetIdOrPath}` : undefined