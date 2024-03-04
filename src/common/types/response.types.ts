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

export type Metadata = {
  count: number
}