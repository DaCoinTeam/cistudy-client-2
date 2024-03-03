import { gql, ApolloError } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"
import {
    buildAuthPayloadString,
    saveTokens,
    AuthTokenType,
    BaseResponse,
    AuthTokens,
    ExtensionsWithOriginalError,
    ErrorStatusCode,
    CourseEntity,
    Schema,
} from "@common"
import { client } from "./client.graphql"

export interface FindManySelfCreatedCoursesInputOptions {
  skip: number;
  take: number;
}

export const findManySelfCreatedCourses = async (
    params: {
    options?: Partial<FindManySelfCreatedCoursesInputOptions>;
  },
    schema: Schema<DeepPartial<CourseEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<Array<CourseEntity>> => {
    try {
        const { options } = params
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindManySelfCreatedCourses($data: FindManySelfCreatedCoursesInputData!) {
                findManySelfCreatedCourses(data: $data) {
        ${payload}
    }
  }
            `,
            variables: {
                data: {
                    options,
                },
            },
        })
        const { data, tokens } =
      graphqlData.findManySelfCreatedCourses as BaseResponse<
        Array<CourseEntity>
      >

        if (authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)

        return data
    } catch (ex) {
        const _ex = ex as ApolloError
        const error = (
      _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        if (
            error.statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        )
            return await findManySelfCreatedCourses(
                params,
                schema,
                AuthTokenType.Refresh
            )
        throw error
    }
}

export interface FindManySelfCreatedCoursesMetadataOutput {
  numberOfCourses: number;
}

export const findManySelfCreatedCoursesMetadata = async (
    schema: Schema<DeepPartial<FindManySelfCreatedCoursesMetadataOutput>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<FindManySelfCreatedCoursesMetadataOutput> => {
    try {
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindManySelfCreatedCoursesMetadata {
                findManySelfCreatedCoursesMetadata {
        ${payload}
    }
  }
            `,
        })
        const { data, tokens } =
      graphqlData.findManySelfCreatedCoursesMetadata as BaseResponse<FindManySelfCreatedCoursesMetadataOutput>

        if (authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)

        return data
    } catch (ex) {
        const _ex = ex as ApolloError
        const error = (
      _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        if (
            error.statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        )
            return await findManySelfCreatedCoursesMetadata(
                schema,
                AuthTokenType.Refresh
            )
        throw error
    }
}
