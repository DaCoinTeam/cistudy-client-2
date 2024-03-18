/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type Disclosure = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
}