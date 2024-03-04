import {
    ExtensionsWithOriginalError,
    CourseEntity,
    ErrorResponse,
    Schema,
    buildPayloadString,
    LectureEntity,
    ResourceEntity,
    AuthTokenType,
    buildAuthPayloadString,
    BaseResponse,
    saveTokens,
    AuthTokens,
    ErrorStatusCode,
    CourseTargetEntity,
} from "@common"
import { client } from "./client.graphql"
import { ApolloError, gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"

export const findOneCourse = async (
    input: {
    courseId: string;
  },
    schema: Schema<DeepPartial<CourseEntity>>
): Promise<CourseEntity> => {
    try {
        const { courseId } = input
        const payload = buildPayloadString(schema)
        const { data } = await client().query({
            query: gql`
            query FindOneCourse($data: FindOneCourseInputData!) {
    findOneCourse(data: $data) {
      ${payload}
    }
  }
          `,
            variables: {
                data: {
                    courseId,
                },
            },
        })

        return data.findOneCourse as CourseEntity
    } catch (ex) {
        console.log(ex)
        const _ex = ex as ApolloError
        const error = (
      _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        throw error
    }
}

export const findManyCourses = async (
    schema: Schema<DeepPartial<CourseEntity>>
): Promise<Array<CourseEntity> | ErrorResponse> => {
    try {
        const payload = buildPayloadString(schema)
        const { data } = await client().query({
            query: gql`
          query FindManyCourses {
  findManyCourses {
      ${payload}
    }
  }
          `,
        })
        return data.findManyCourses as Array<CourseEntity>
    } catch (ex) {
        console.log(ex)
        const _ex = ex as ApolloError
        const error = (
      _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        return error
    }
}

export const findManyLectures = async (
    input: {
        params: {
            sectionId: string;
        },
        options?: Partial<{
            take: number,
            skip: number
        }>
  },
    schema: Schema<DeepPartial<LectureEntity>>
): Promise<Array<LectureEntity>> => {
    try {
        const { params } = input
        const { sectionId } = params

        const payload = buildPayloadString(schema)
        const { data } = await client().query({
            query: gql`
            query FindManyLectures($data: FindManyLecturesInputData!) {
                findManyLectures(data: $data) {
    ${payload}
  }
}
        `,
            variables: {
                data: {
                    sectionId,
                },
            },
        })

        return data.findManyLectures as Array<LectureEntity>
    } catch (ex) {
        console.log(ex)
        const _ex = ex as ApolloError
        const error = (
      _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        throw error
    }
}

export const findOneLecture = async (
    input: {
        params: {
            lectureId: string;
        },
        options?: Partial<{
            followerId: string
        }>
  },
    schema: Schema<DeepPartial<LectureEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<LectureEntity> => {
    try {
        const { params, options } = input
        const { lectureId } = params
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindOneLecture($data: FindOneLectureInputData!) {
                findOneLecture(data: $data) {              
      ${payload}
    }
  }
          `,
            variables: {
                data: {
                    params: {
                        lectureId,
                    },
                    options
                },
            },
        })

        const { data, tokens } =
      graphqlData.findOneLecture as BaseResponse<LectureEntity>
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
            return await findOneLecture(input, schema, AuthTokenType.Refresh)

        throw error
    }
}

export const findManyResources = async (
    input: {
    lectureId: string;
  },
    schema: Schema<DeepPartial<ResourceEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<Array<ResourceEntity>> => {
    try {
        const { lectureId } = input
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindManyResources($data: FindManyResourcesInputData!) {
                findManyResources(data: $data) {              
      ${payload}
    }
  }
          `,
            variables: {
                data: {
                    lectureId,
                },
            },
        })

        const { data, tokens } = graphqlData.findManyResources as BaseResponse<
      Array<ResourceEntity>
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
            return await findManyResources(input, schema, AuthTokenType.Refresh)

        throw error
    }
}

export const findManyCourseTargets = async (
    input: {
    courseId: string;
  },
    schema: Schema<DeepPartial<CourseTargetEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<Array<CourseTargetEntity>> => {
    try {
        const { courseId } = input
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindManyCourseTargets($data: FindManyCourseTargetsInputData!) {
                findManyCourseTargets(data: $data) {       
      ${payload}
    }
  }
          `,
            variables: {
                data: {
                    courseId,
                },
            },
        })

        const { data, tokens } = graphqlData.findManyCourseTargets as BaseResponse<
      Array<CourseTargetEntity>
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
            return await findManyCourseTargets(input, schema, AuthTokenType.Refresh)

        throw error
    }
}
