import { ContentType } from "./entities.types"

export type Key = string | number;

export interface WithKey<T> {
    key: string;
    data: T;
}

export type AppendKey<T extends object> = T & { key: string }

export interface ContentData {
    contentType: ContentType;
    text?: string;
    contentMedias?: Array<WithKey<File>>;
}

export type Content = AppendKey<ContentData>
