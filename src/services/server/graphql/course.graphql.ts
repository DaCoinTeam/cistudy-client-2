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
} from "@common"
import { client } from "./client.graphql"
import { ApolloError, gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"

export const findOneCourse = async (
    params: {
        courseId: string;
    },
    schema: Schema<DeepPartial<CourseEntity>>
): Promise<CourseEntity | ErrorResponse> => {
    try {
        const { courseId } = params
        const payload = buildPayloadString(schema)
        const { data } = await client().query({
            query: gql`
            query FindOneCourse($data: FindOneCourseData!) {
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

        return error
    }
}

export const findManyCourses = async (
    schema: Schema<DeepPartial<CourseEntity>>
): Promise<Array<CourseEntity> | ErrorResponse> => {
    try {
        const payload = buildPayloadString(schema)
        const { data } = await client().query({
            query: gql`
            query FindManyCourses() {
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
    params: {
        sectionId: string;
    },
    schema: Schema<DeepPartial<LectureEntity>>
): Promise<Array<LectureEntity> | ErrorResponse> => {
    try {
        const { sectionId } = params
        const payload = buildPayloadString(schema)
        const { data } = await client().query({
            query: gql`
            query FindManyLectures($data: FindManyLecturesData!) {
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

        return error
    }
}

export const findManyResources = async (
    params: {
        lectureId: string;
    },
    schema: Schema<DeepPartial<ResourceEntity>>,
    authTokenType: AuthTokenType = AuthTokenType.Access
): Promise<Array<ResourceEntity> | ErrorResponse> => {
    try {
        const { lectureId } = params
        const payload = buildAuthPayloadString(schema, authTokenType)
        const { data: graphqlData } = await client(authTokenType).query({
            query: gql`
            query FindManyResources($data: FindManyResourcesData!) {
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
            return await findManyResources(params, schema, AuthTokenType.Refresh)

        return error
    }
}
