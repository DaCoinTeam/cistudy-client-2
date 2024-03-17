import { gql, ApolloError } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"
import {
    CourseEntity,
    ExtensionsWithOriginalError,
    Schema,
    UserEntity,
    buildPayloadString,
} from "@common"
import { client } from "./client"

export const findOneUser = async (
    input: {
    params: {
        userId: string;
    },
    options?: Partial<{
      followerId: string;
    }>;
  },
    schema?: Schema<DeepPartial<UserEntity>>
): Promise<UserEntity> => {
    const { params, options } = input
    const { userId } = params

    try {
        const payload = buildPayloadString(schema)
        const { data: graphqlData } = await client().query({
            query: gql`
            query FindOneUser($data: FindOneUserInputData!) {
                findOneUser(data: $data)   {
      ${payload}
    }
  }
          `,
            variables: {
                data: {
                    userId,
                    options,
                },
            },
        })
        return graphqlData.findOneUser as UserEntity
    } catch (ex) {
        const { graphQLErrors } = ex as ApolloError
        throw (graphQLErrors[0].extensions as ExtensionsWithOriginalError)
            .originalError
    }
}

export const findManyFollowers = async (
    input: {
    userId: string;
  },
    schema?: Schema<DeepPartial<UserEntity>>
): Promise<Array<UserEntity>> => {
    const { userId } = input
    try {
        const payload = buildPayloadString(schema)
        const { data: graphqlData } = await client().query({
            query: gql`
            query FindManyFollowers($data: FindManyFollowersInputData!) {
                findManyFollowers(data: $data)   {
      ${payload}
    }
  }
          `,
            variables: {
                data: {
                    userId,
                },
            },
        })
        return graphqlData.findManyFollowers as Array<UserEntity>
    } catch (ex) {
        const { graphQLErrors } = ex as ApolloError
        throw (graphQLErrors[0].extensions as ExtensionsWithOriginalError)
            .originalError
    }
}

export const findManyCreatedCourses = async (
    input: {
    params: {
        userId: string;
    },
    options?: Partial<{
        skip: number;
        take: number;    
    }>
  },
    schema?: Schema<DeepPartial<CourseEntity>>
): Promise<Array<CourseEntity>> => {
    const { params, options } = input
    const { userId } = params

    try {
        const payload = buildPayloadString(schema)
        const { data: graphqlData } = await client().query({
            query: gql`
            query FindManyCreatedCourses($data: FindManyCreatedCoursesInputData!) {
                findManyCreatedCourses(data: $data)   {
      ${payload}
    }
  }
          `,
            variables: {
                data: {
                    userId,
                    options
                },
            },
        })
        return graphqlData.findManyCreatedCourses as Array<CourseEntity>
    } catch (ex) {
        const { graphQLErrors } = ex as ApolloError
        throw (graphQLErrors[0].extensions as ExtensionsWithOriginalError)
            .originalError
    }
}
