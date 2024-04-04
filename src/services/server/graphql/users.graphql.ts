import { gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"
import {
    CourseEntity,
    Schema,
    UserEntity,
    buildAuthPayloadString,
    buildPayloadString,
} from "@common"
import { authClient, client, getGraphqlResponseData } from "./client"

export interface FindOneUserInputData {
    params: {
        userId: string;
    },
    options?: {
        followerId?: string;
    };
}

export const findOneUser = async (
    data: FindOneUserInputData,
    schema?: Schema<DeepPartial<UserEntity>>
): Promise<UserEntity> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
            query FindOneUser($data: FindOneUserInputData!) {
                findOneUser(data: $data)   {
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
        isAuth: false
    })
}

export interface FindManyFollowersInputData {
    params: {
        userId: string;
    },
}

export const findManyFollowers = async (
    data: FindManyFollowersInputData,
    schema?: Schema<DeepPartial<UserEntity>>
): Promise<Array<UserEntity>> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
            query FindManyFollowers($data: FindManyFollowersInputData!) {
                findManyFollowers(data: $data)   {
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
        isAuth: false
    })
}

export interface FindManyCreatedCoursesInputData {
    params: {
        userId: string;
    },
    options?: {
        skip?: number;
        take?: number;
    }
}

export const findManyCreatedCourses = async (
    data: FindManyCreatedCoursesInputData,
    schema?: Schema<DeepPartial<CourseEntity>>
): Promise<Array<CourseEntity>> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
            query FindManyCreatedCourses($data: FindManyCreatedCoursesInputData!) {
                findManyCreatedCourses(data: $data)   {
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
        isAuth: false
    })
}

export interface FindManyUsersInputData {
    options?: {
        take?: number;
        skip?: number;
    };
}

export interface FindManyUsersOutputData {
    results: Array<UserEntity>;
    metadata: {
        count: number;
    };
}

export const findManyUsers = async (
    data: FindManyUsersInputData,
    schema?: Schema<DeepPartial<FindManyUsersOutputData>>
): Promise<FindManyUsersOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyUsers($data: FindManyUsersInputData!) {
                findManyUsers(data: $data)   {
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