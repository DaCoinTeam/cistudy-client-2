import {
    ExtensionsWithOriginalError,
    PostEntity,
    ErrorResponse,
    Schema,
    buildPayloadString,
    PostCommentEntity,
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
    schema?: Schema<DeepPartial<PostEntity>>
): Promise<Array<PostEntity> | ErrorResponse> => {
    try {
        const { courseId, options } = params
        const payload = buildPayloadString(schema)
        const { data } = await client().query({
            query: gql`
            query FindManyPosts($input: FindManyPostsInput!) {
  findManyPosts(input: $input) {
      ${payload}
  }
}
          `,
            variables: {
                input: {
                    courseId,
                    options,
                },
            },
        })

        return data.findManyPosts as Array<PostEntity>
    } catch (ex) {
        console.log(ex)
        const _ex = ex as ApolloError
        const error = (
      _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        return error
    }
}

export const findOnePost = async (
    params: {
    postId: string;
  },
    schema?: Schema<DeepPartial<PostEntity>>
): Promise<PostEntity | ErrorResponse> => {
    try {
        const { postId } = params
        const payload = buildPayloadString(schema)
        const { data } = await client().query({
            query: gql`
            query FindOnePost($input: FindOnePostInput!) {
    findOnePost(input: $input) {
      ${payload}
    }
  }
          `,
            variables: {
                input: {
                    postId,
                },
            },
        })

        return data.findOnePost as PostEntity
    } catch (ex) {
        const _ex = ex as ApolloError
        const error = (
      _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        return error
    }
}

export const findOnePostComment = async (
    params: {
  postCommentId: string;
},
    schema?: Schema<DeepPartial<PostCommentEntity>>
): Promise<PostCommentEntity | ErrorResponse> => {
    try {
        const { postCommentId } = params
        const payload = buildPayloadString(schema)
        const { data } = await client().query({
            query: gql`
          query FindOnePostComment($input: FindOnePostCommentInput!) {
  findOnePostComment(input: $input) {
    ${payload}
  }
}
        `,
            variables: {
                input: {
                    postCommentId,
                },
            },
        })

        return data.findOnePostComment as PostCommentEntity
    } catch (ex) {
        const _ex = ex as ApolloError
        const error = (
    _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        return error
    }
}
