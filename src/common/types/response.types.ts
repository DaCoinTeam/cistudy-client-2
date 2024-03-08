export type BaseResponse<T> = {
  data: T;
  tokens?: AuthTokens;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export enum AuthTokenType {
  Access = "Access",
  Refresh = "Refresh",
}

export interface Output<T> {
  data: T,
  tokens?: AuthTokens
}

export interface Input<T> {
  data: T,
  files?: Array<File>
}
export interface ParamsWithOptions<T, K> {
  params: T,
  options?: Partial<K>
}

export interface ResultsWithMetadata<T, K> {
  results: Array<T>,
  metadata?: Partial<K>
}

export type EmptyObject = NonNullable<unknown>