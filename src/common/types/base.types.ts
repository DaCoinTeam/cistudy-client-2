import { MediaType } from "./entities.types"

export type Key = string | number;

export interface WithKey<T> {
    key: string;
    data: T;
}

export type AppendKey<T extends object> = T & { key: string }

export interface Media {
    mediaType: MediaType,
    file: File,
}

export interface FetchedMedia {
    mediaType: MediaType,
    mediaId: string,
}

export interface Swr<T> {
    data: T,
    isLoading: boolean
}