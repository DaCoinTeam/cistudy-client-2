import { gql, ApolloError } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"
import {
    ErrorResponse,
    ExtensionsWithOriginalError,
    Structure,
    UserEntity,
    buildPayloadString,
} from "@common"
import { client } from "./client.graphql"

export const findOneUser = async (
    params: {
    userId: string;
  },
    structure?: Structure<DeepPartial<UserEntity>>
): Promise<UserEntity | ErrorResponse> => {
    const { userId } = params
    try {
        const payload = buildPayloadString(structure)
        const { data: graphqlData } = await client().query({
            query: gql`
            query FindOneUser($input: FindOneUserInput!) {
                findOneUser(input: $input)   {
      ${payload}
    }
  }
          `,
            variables: {
                input: {
                    userId,
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
