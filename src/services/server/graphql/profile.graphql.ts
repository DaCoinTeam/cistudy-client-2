import { gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"
import {
    buildAuthPayloadString,
    CourseEntity,
    Schema,
} from "@common"
import { authClient, getGraphqlResponseData } from "./client"

export interface FindManySelfCreatedCoursesInputData {
  options?: {
    skip?: number;
    take?: number;
  };
}

export interface FindManySelfCreatedCoursesOutputData {
  results: Array<CourseEntity>;
  metadata: {
    count: number;
  };
}

export const findManySelfCreatedCourses = async (
    data: FindManySelfCreatedCoursesInputData,
    schema: Schema<DeepPartial<FindManySelfCreatedCoursesOutputData>>
): Promise<FindManySelfCreatedCoursesOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const response = await authClient.query({
        query: gql`
            query FindManySelfCreatedCourses($data: FindManySelfCreatedCoursesInputData!) {
                findManySelfCreatedCourses(data: $data) {
        ${payload}
    }
  }
            `,
        variables: {
            data,
        },
    })
    return getGraphqlResponseData({
        response,
        isAuth: true,
    })
}
