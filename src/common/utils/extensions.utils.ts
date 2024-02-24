import { MediaType } from "@common"
import { extname } from "path"

export const getMediaType = (filename: string) : MediaType | null => {
    const imageExtensions = [
        ".png",
        ".jpg",
        ".webp",
        ".jpeg"
    ]
    const videoExtensions = [
        ".mkv",
        ".mp4"
    ]

    if (imageExtensions.includes(extname(filename).toLowerCase())) {
        return MediaType.Image
    } 
    if (videoExtensions.includes(extname(filename).toLowerCase())) {
        return MediaType.Video
    } 
    return null
}