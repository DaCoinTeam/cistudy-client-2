import { DeepPartial } from "@apollo/client/utilities"
import {
    AuthTokenType,
    ErrorResponse,
    ErrorStatusCode,
    ExtensionsWithOriginalError,
    Structure,
    UserEntity,
    buildPayloadString,
} from "@common"
import { client } from "./client.graphql"
import { ApolloError, gql } from "@apollo/client"

export const findProfileByAuthToken = async (
    structure?: Structure<DeepPartial<UserEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<Partial<UserEntity> | ErrorResponse> => {
    try {
        const payload = buildPayloadString(structure)
        console.log(payload)
        const { data } = await client(authTokenType).query({
            query: gql`
            query FindProfileByAuthToken() {
        findProfileByAuthToken  {
      ${payload}
    }
  }
          `,
        })
        return data.findProfileByAuthToken as Partial<UserEntity>
    } catch (ex) {
        console.log(ex)
        const { graphQLErrors } = ex as ApolloError
        const error = (graphQLErrors[0].extensions as ExtensionsWithOriginalError)
            .originalError
        if (
            error.statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        ) return await findProfileByAuthToken(structure, AuthTokenType.Refresh)
        return error
    }
}
