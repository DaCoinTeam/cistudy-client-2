import {
    ExtensionsWithOriginalError,
    PostEntity,
    ErrorResponse,
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

export type FindManyPostOptions = Partial<{
  skip: number;
  take: number;
}>;

export const findManyPosts = async (
    params: {
    courseId: string;
    options?: FindManyPostOptions;
  },
    schema?: Schema<DeepPartial<PostEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<Array<PostEntity> | ErrorResponse> => {
    try {
        const { courseId, options } = params
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindManyPosts($data: FindManyPostsData!) {
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
        const { data, tokens } = graphqlData.findManyPosts as BaseResponse<Array<PostEntity>>

        if (authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)

        return data as Array<PostEntity>
    } catch (ex) {
        console.log(ex)
        const _ex = ex as ApolloError
        const error = (
      _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        if (
            error.statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        )
            return await findManyPosts(params, schema, AuthTokenType.Refresh)
        return error
    }
}

export const findOnePost = async (
    params: {
    postId: string;
  },
    schema?: Schema<DeepPartial<PostEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<PostEntity | ErrorResponse> => {
    try {
        const { postId } = params
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindOnePost($data: FindOnePostData!) {
    findOnePost(data: $data) {
      ${payload}
    }
  }
          `,
            variables: {
                data: {
                    postId,
                },
            },
        })

        const { data, tokens } = graphqlData.findOnePost as BaseResponse<
      PostEntity
    >
        if (authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)

        return data as PostEntity
    } catch (ex) {
        const _ex = ex as ApolloError
        const error = (
      _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        if (
            error.statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        )
            return await findOnePost(params, schema, AuthTokenType.Refresh)

        return error
    }
}

export const findOnePostComment = async (
    params: {
    postCommentId: string;
  },
    schema?: Schema<DeepPartial<PostCommentEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<PostCommentEntity | ErrorResponse> => {
    try {
        const { postCommentId } = params
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
          query FindOnePostComment($data: FindOnePostCommentData!) {
  findOnePostComment(data: $data) {
    ${payload}
  }
}
        `,
            variables: {
                data: {
                    postCommentId,
                },
            },
        })

        const { data, tokens } = graphqlData.findOnePostComment as BaseResponse<
      PostCommentEntity
    >
        if (authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)

        return data as PostCommentEntity
    } catch (ex) {
        const _ex = ex as ApolloError
        const error = (
      _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        if (
            error.statusCode === ErrorStatusCode.Unauthorized &&
      authTokenType === AuthTokenType.Access
        )
            return await findOnePostComment(params, schema, AuthTokenType.Refresh)

        return error
    }
}
