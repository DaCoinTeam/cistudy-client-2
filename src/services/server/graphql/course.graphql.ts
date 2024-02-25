import {
    ExtensionsWithOriginalError,
    CourseEntity,
    ErrorResponse,
    Schema,
    buildPayloadString,
    LectureEntity,
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

export const findOneLecture = async (
    params: {
  lectureId: string;
},
    schema: Schema<DeepPartial<LectureEntity>>
): Promise<LectureEntity | ErrorResponse> => {
    try {
        const { lectureId } = params
        const payload = buildPayloadString(schema)
        const { data } = await client().query({
            query: gql`
          query FindOneLecture($data: FindOneLectureData!) {
            findOneLecture(data: $data) {
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

        return data.findOneLecture as LectureEntity
    } catch (ex) {
        console.log(ex)
        const _ex = ex as ApolloError
        const error = (
    _ex.graphQLErrors[0].extensions as ExtensionsWithOriginalError
        ).originalError

        return error
    }
}