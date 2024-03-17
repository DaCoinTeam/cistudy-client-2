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
import { client } from "./client"

export interface FindManySelfCreatedCoursesInputOptions {
  skip: number;
  take: number;
}

export interface FindManySelfCreatedCoursesOutputData {
  results: Array<CourseEntity>;
  metadata: {
    count: number;
  };
}

export const findManySelfCreatedCourses = async (
    input: {
    options?: Partial<FindManySelfCreatedCoursesInputOptions>;
  },
    schema: Schema<DeepPartial<FindManySelfCreatedCoursesOutputData>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<FindManySelfCreatedCoursesOutputData> => {
    try {
        const { options } = input
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
      graphqlData.findManySelfCreatedCourses as BaseResponse<FindManySelfCreatedCoursesOutputData>

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
                input,
                schema,
                AuthTokenType.Refresh
            )
        throw error
    }
}