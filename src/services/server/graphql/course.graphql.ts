import {
    ExtensionsWithOriginalError,
    CourseEntity,
    ErrorResponse,
    Structure,
    buildPayloadString,
} from "@common"
import { client } from "./client.graphql"
import { ApolloError, gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"

export const findOneCourse = async (
    params: {
    courseId: string;
  },
    structure?: Structure<DeepPartial<CourseEntity>>
): Promise<CourseEntity | ErrorResponse> => {
    try {
        const { courseId } = params
        const payload = buildPayloadString(structure)
        const { data } = await client().query({
            query: gql`
            query FindOneCourse($input: FindOneCourseInput!) {
    findOneCourse(input: $input) {
      ${payload}
    }
  }
          `,
            variables: {
                input: {
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
    structure?: Structure<DeepPartial<CourseEntity>>
): Promise<Array<CourseEntity> | ErrorResponse> => {
    try {
        const payload = buildPayloadString(structure)
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
