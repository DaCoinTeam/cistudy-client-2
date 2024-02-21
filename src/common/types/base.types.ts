export type Key = string | number;

export interface WithKey<T> {
    key: string;
    data: T;
}

export type AppendKey<T extends object> = T & { key: string }