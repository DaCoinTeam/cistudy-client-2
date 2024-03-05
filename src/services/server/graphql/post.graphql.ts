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
    PostCommentReplyEntity,
} from "@common"
import { client } from "./client.graphql"
import { ApolloError, gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"


export interface FindManyPostsOutputData {
    results: Array<PostEntity>;
    metadata: {
        count: number;
    };
}

export const findManyPosts = async (
    input: {
        params: {
            courseId: string;
        },
        options?: Partial<{
            take: number,
            skip: number
        }>;
    },
    schema: Schema<DeepPartial<FindManyPostsOutputData>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<FindManyPostsOutputData> => {
    try {
        const { params, options } = input
        const { courseId } = params

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
                    params: {
                        courseId,
                    },
                    options,
                },
            },
        })
        const { data, tokens } =
            graphqlData.findManyPosts as BaseResponse<FindManyPostsOutputData>

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
            return await findManyPosts(input, schema, AuthTokenType.Refresh)
        throw error
    }
}

export interface FindManyPostCommentsOutputData {
    results: Array<PostCommentEntity>;
    metadata: {
        count: number;
    };
}

export const findManyPostComments = async (
    input: {
        params: {
            postId: string;
        };
        options?: Partial<{
            take: number;
            skip: number;
        }>;
    },
    schema: Schema<DeepPartial<FindManyPostCommentsOutputData>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<FindManyPostCommentsOutputData> => {
    try {
        const { params, options } = input
        const { postId } = params

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
                    params: {
                        postId,
                    },
                    options
                },
            },
        })
        const { data, tokens } =
            graphqlData.findManyPostComments as BaseResponse<FindManyPostCommentsOutputData>

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
            return await findManyPostComments(input, schema, AuthTokenType.Refresh)

        throw error
    }
}


export interface FindManyPostCommentRepliesOutputData {
    results: Array<PostCommentReplyEntity>;
    metadata: {
        count: number;
    };
}


export const findManyPostCommentReplies = async (
    input: {
        params: {
            postCommentId: string;
        };
        options?: Partial<{
            take: number;
            skip: number;
        }>;
    },
    schema: Schema<DeepPartial<FindManyPostCommentRepliesOutputData>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<FindManyPostCommentRepliesOutputData> => {
    try {
        const { params, options } = input
        const { postCommentId } = params

        const payload = buildAuthPayloadString(schema, authTokenType)

        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindManyPostCommentReplies($data: FindManyPostCommentRepliesInputData!) {
                findManyPostCommentReplies(data: $data) {
    ${payload}
  }
}
        `,
            variables: {
                data: {
                    params: {
                        postCommentId,
                    },
                    options
                },
            },
        })
        const { data, tokens } =
            graphqlData.findManyPostCommentReplies as BaseResponse<FindManyPostCommentRepliesOutputData>

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
            return await findManyPostCommentReplies(input, schema, AuthTokenType.Refresh)

        throw error
    }
}
