import { DeepPartial } from "@apollo/client/utilities"
import {
    Schema,
    AccountEntity,
    AccountKind,
    buildAuthPayloadString,
    buildAuthPayloadVoidString,
} from "@common"
import { authClient, client, getGraphqlResponseData } from "./client"
import { gql } from "@apollo/client"
import { getAssetUrl } from ".."

export const init = async (
    schema: Schema<DeepPartial<AccountEntity>>,
): Promise<AccountEntity> => {
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
    data: SignInInputData
): Promise<AccountEntity> => {
    const payload = buildAuthPayloadVoidString()
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
): Promise<AccountEntity> => {
  console.log('data', data)
    const payload = buildAuthPayloadVoidString()
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
  kind?: AccountKind;
}) => {
    const { avatarId, avatarUrl, kind } = params
    return (avatarId || kind === AccountKind.Local) ? getAssetUrl(avatarId) : avatarUrl
}
