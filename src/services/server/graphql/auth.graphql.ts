import { DeepPartial } from "@apollo/client/utilities"
import {
    Schema,
    UserEntity,
    UserKind,
    buildAuthPayloadString,
} from "@common"
import { authClient, client, getGraphqlResponseData } from "./client"
import { gql } from "@apollo/client"
import { getAssetUrl } from ".."

export const init = async (
    schema: Schema<DeepPartial<UserEntity>>,
): Promise<UserEntity> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query Init {
        init  {
      ${payload}
    }
  }
          `,
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true,
    })
}

export interface SignInInputData {
  params: {
    email: string;
    password: string;
  };
}

export const signIn = async (
    data: SignInInputData,
    schema: Schema<DeepPartial<UserEntity>>
): Promise<UserEntity> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
            query SignIn($data: SignInInputData!) {
                signIn(data: $data) {
      ${payload}
    }
  }
          `,
        variables: {
            data,
        },
    })

    return getGraphqlResponseData({
        data : graphqlData,
        isAuth: true,
    })
}

export interface VerifyGoogleAccessTokenInputData {
  params: {
    token: string;
  };
}

export const verifyGoogleAccessToken = async (
    data: VerifyGoogleAccessTokenInputData,
    schema: Schema<DeepPartial<UserEntity>>
): Promise<UserEntity> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
           query VerifyGoogleAccessToken($data: VerifyGoogleAccessTokenData!) {
  verifyGoogleAccessToken(data: $data) {
      ${payload}
    }
  }
          `,
        variables: {
            data,
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true
    })
}

export const getAvatarUrl = (params: {
  avatarId?: string;
  avatarUrl?: string;
  kind?: UserKind;
}) => {
    const { avatarId, avatarUrl, kind } = params
    return (avatarId || kind === UserKind.Local) ? getAssetUrl(avatarId) : avatarUrl
}
