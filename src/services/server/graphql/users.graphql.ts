import { gql, ApolloError } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"
import {
    ErrorResponse,
    ExtensionsWithOriginalError,
    Schema,
    UserEntity,
    buildPayloadString,
} from "@common"
import { client } from "./client.graphql"

export const findOneUser = async (
    params: {
    userId: string;
    options?: Partial<{
        followerId: string
    }>
  },
    schema?: Schema<DeepPartial<UserEntity>>
): Promise<UserEntity | ErrorResponse> => {
    const { userId, options } = params
    try {
        const payload = buildPayloadString(schema)
        const { data: graphqlData } = await client().query({
            query: gql`
            query FindOneUser($data: FindOneUserData!) {
                findOneUser(data: $data)   {
      ${payload}
    }
  }
          `,
            variables: {
                data: {
                    userId,
                    options
                },
            },
        })
        return graphqlData.findOneUser as UserEntity
    } catch (ex) {
        const { graphQLErrors } = ex as ApolloError
        return (graphQLErrors[0].extensions as ExtensionsWithOriginalError)
            .originalError
    }
}
