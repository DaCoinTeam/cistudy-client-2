import {
    ExtensionsWithOriginalError,
    PostEntity,
    Schema,
    PostCommentEntity,
    BaseResponse,
    AuthTokenType,
    saveTokens,
    AuthTokens,
    ErrorStatusCode,
    buildAuthPayloadString,
} from "@common"
import { client } from "./client.graphql"
import { ApolloError, gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"

export interface FindManyPostsOptions {
    skip: number;
    take: number;
}

export interface FindManyPostsOutputData {
    results: Array<PostEntity>
    metadata: {
        count: number
    }
}

export const findManyPosts = async (
    params: {
        courseId: string;
        options?: Partial<FindManyPostsOptions>;
    },
    schema: Schema<DeepPartial<FindManyPostsOutputData>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<FindManyPostsOutputData> => {
    try {
        const { courseId, options } = params
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindManyPosts($data: FindManyPostsInputData!) {
  findManyPosts(data: $data) {
      ${payload}
  }
}
          `,
            variables: {
                data: {
                    courseId,
                    options,
                },
            },
        })
        const { data, tokens } = graphqlData.findManyPosts as BaseResponse<
            FindManyPostsOutputData
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
            return await findManyPosts(params, schema, AuthTokenType.Refresh)
        throw error
    }
}

export interface FindManyPostCommentsOptions {
    skip: number;
    take: number;
}

export interface FindManyPostCommentsOutputData {
    results: Array<PostCommentEntity>
    metadata: {
        count: number
    }
}

export const findManyPostComments = async (
    params: {
        postId: string;
        options?: Partial<FindManyPostCommentsOptions>;
    },
    schema: Schema<DeepPartial<FindManyPostCommentsOutputData>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<FindManyPostCommentsOutputData> => {
    try {
        const { postId, options } = params
        const payload = buildAuthPayloadString(schema, authTokenType)

        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindManyPostComments($data: FindManyPostCommentsInputData!) {
                findManyPostComments(data: $data) {
    ${payload}
  }
}
        `,
            variables: {
                data: {
                    postId,
                    options
                },
            },
        })
        const { data, tokens } = graphqlData.findManyPostComments as BaseResponse<
            FindManyPostCommentsOutputData
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
            return await findManyPostComments(params, schema, AuthTokenType.Refresh)

        throw error
    }
}