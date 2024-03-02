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
    schema: Schema<DeepPartial<PostEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<Array<PostEntity> | ErrorResponse> => {
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
      Array<PostEntity>
    >

        if (authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)

        return data
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

export interface FindManyPostsMetadataOutputData {
  numberOfPosts: number;
}

export const findManyPostsMetadata = async (
    schema: Schema<DeepPartial<FindManyPostsMetadataOutputData>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<FindManyPostsMetadataOutputData | ErrorResponse> => {
    try {
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindManyPostsMetadata {
                findManyPostsMetadata {
      ${payload}
  }
}
          `,
        })
        const { data, tokens } =
      graphqlData.findManyPostsMetadata as BaseResponse<FindManyPostsMetadataOutputData>

        if (authTokenType === AuthTokenType.Refresh)
            saveTokens(tokens as AuthTokens)

        return data
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
            return await findManyPostsMetadata(schema, AuthTokenType.Refresh)
        return error
    }
}

export const findManyPostComments = async (
    params: {
    postId: string;
  },
    schema: Schema<DeepPartial<PostCommentEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<Array<PostCommentEntity> | ErrorResponse> => {
    try {
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
                    postId,
                },
            },
        })
        const { data, tokens } = graphqlData.findManyPostComments as BaseResponse<
      Array<PostCommentEntity>
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

        return error
    }
}
