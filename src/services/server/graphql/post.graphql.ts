import {
    PostEntity,
    Schema,
    PostCommentEntity,
    buildAuthPayloadString,
    PostCommentReplyEntity,
} from "@common"
import { authClient, getGraphqlResponseData } from "./client"
import { gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"

export interface FindManyPostsInputData {
    params: {
        courseId: string
    },
    options?: {
        skip?: number,
        take?: number
    } 
} 

export interface FindManyPostsOutputData {
    results: Array<PostEntity>;
    metadata: {
        count: number;
    };
}

export const findManyPosts = async (
    data: FindManyPostsInputData,
    schema: Schema<DeepPartial<FindManyPostsOutputData>>,
): Promise<FindManyPostsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyPosts($data: FindManyPostsInputData!) {
  findManyPosts(data: $data) {
      ${payload}
  }
}
          `,
        variables: {
            data
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true
    })   
}

export interface FindManyPostCommentsInputData {
    params: {
        postId: string;
    };
    options?: {
        take?: number;
        skip?: number;
    };
}

export interface FindManyPostCommentsOutputData {
    results: Array<PostCommentEntity>;
    metadata: {
        count: number;
    };
}

export const findManyPostComments = async (
    data: FindManyPostCommentsInputData,
    schema: Schema<DeepPartial<FindManyPostCommentsOutputData>>
): Promise<FindManyPostCommentsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyPostComments($data: FindManyPostCommentsInputData!) {
                findManyPostComments(data: $data) {
    ${payload}
  }
}
        `,
        variables: {
            data
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true
    })   
}


export interface FindManyPostCommentRepliesInputData {
    params: {
        postCommentId: string;
    };
    options?: {
        take?: number;
        skip?: number;
    };
}

export interface FindManyPostCommentRepliesOutputData {
    results: Array<PostCommentReplyEntity>;
    metadata: {
        count: number;
    };
}

export const findManyPostCommentReplies = async (
    data: FindManyPostCommentRepliesInputData,
    schema: Schema<DeepPartial<FindManyPostCommentRepliesOutputData>>,
): Promise<FindManyPostCommentRepliesOutputData> => {
    const payload = buildAuthPayloadString(schema)

    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyPostCommentReplies($data: FindManyPostCommentRepliesInputData!) {
                findManyPostCommentReplies(data: $data) {
    ${payload}
  }
}
        `,
        variables: {
            data
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true
    })   
}

export interface FindOnePostInputData {
    params: {
        postId: string;
    };
}

export const findOnePost = async (
    data: FindOnePostInputData,
    schema: Schema<DeepPartial<PostEntity>>
): Promise<PostEntity> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindOnePost($data: FindOnePostInputData!) {
                findOnePost(data: $data) {
                    ${payload}
                }
            }
        `,

        variables: {
            data
        },
    })

    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true
    })
}
