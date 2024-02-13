import { DeepPartial } from "@apollo/client/utilities"
import {
    AuthTokenType,
    AuthTokens,
    BaseResponse,
    ErrorResponse,
    ErrorStatusCode,
    ExtensionsWithOriginalError,
    Structure,
    UserEntity,
    buildAuthPayloadString,
    saveTokens,
} from "@common"
import { client } from "./client.graphql"
import { ApolloError, gql } from "@apollo/client"

export const findProfileByAuthToken = async (
    structure?: Structure<DeepPartial<UserEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<DeepPartial<UserEntity> | ErrorResponse> => {
    try {
        const payload = buildAuthPayloadString(structure, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindProfileByAuthToken {
        findProfileByAuthToken  {
      ${payload}
    }
  }
          `,
        })
        const { data, tokens } = graphqlData.findProfileByAuthToken as BaseResponse<
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
            return await findProfileByAuthToken(structure, AuthTokenType.Refresh)
        return error
    }
}
