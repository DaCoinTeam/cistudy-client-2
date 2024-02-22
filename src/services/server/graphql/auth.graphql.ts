import { DeepPartial } from "@apollo/client/utilities"
import {
    AuthTokenType,
    AuthTokens,
    BaseResponse,
    ErrorResponse,
    ErrorStatusCode,
    ExtensionsWithOriginalError,
    Schema,
    UserEntity,
    buildAuthPayloadString,
    saveTokens,
} from "@common"
import { client } from "./client.graphql"
import { ApolloError, gql } from "@apollo/client"

export const init = async (
    schema?: Schema<DeepPartial<UserEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<DeepPartial<UserEntity> | ErrorResponse> => {
    try {
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query Init {
        init  {
      ${payload}
    }
  }
          `,
        })
        const { data, tokens } = graphqlData.init as BaseResponse<
      DeepPartial<UserEntity>
    >
        if (authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)
        return data
    } catch (ex) {
        const { graphQLErrors } = ex as ApolloError
        const error = (graphQLErrors[0].extensions as ExtensionsWithOriginalError)
            .originalError
        if (
            error.statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        )
            return await init(schema, AuthTokenType.Refresh)
        return error
    }
}

export const signIn = async (
    params: {
    email: string;
    password: string;
  },
    schema?: Schema<DeepPartial<UserEntity>>
): Promise<DeepPartial<UserEntity> | ErrorResponse> => {
    const { email, password } = params
    try {
        const payload = buildAuthPayloadString(schema, AuthTokenType.Refresh)
        const { data: graphqlData } = await client(AuthTokenType.Refresh).query({
            query: gql`
            query SignIn($data: SignInData!) {
                signIn(data: $data) {
      ${payload}
    }
  }
          `,
            variables: {
                data: {
                    email,
                    password,
                },
            },
        })
        const { data, tokens } = graphqlData.signIn as BaseResponse<
      DeepPartial<UserEntity>
    >
        saveTokens(tokens as AuthTokens)
        return data
    } catch (ex) {
        const { graphQLErrors } = ex as ApolloError
        const error = (graphQLErrors[0].extensions as ExtensionsWithOriginalError)
            .originalError
        return error
    }
}
