import {
    CourseEntity,
    Schema,
    buildPayloadString,
    LectureEntity,
    ResourceEntity,
    buildAuthPayloadString,
    CourseTargetEntity,
    CategoryEntity,
    SubcategoryEntity,
    TopicEntity,
} from "@common"
import { authClient, client, getGraphqlResponseData } from "./client"
import { gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"

export interface FindOneCourseInputData {
  params: {
    courseId: string;
  };
}

export const findOneCourse = async (
    data: FindOneCourseInputData,
    schema: Schema<DeepPartial<CourseEntity>>
): Promise<CourseEntity> => {
    const payload = buildPayloadString(schema)
    const response = await client.query({
        query: gql`
            query FindOneCourse($data: FindOneCourseInputData!) {
    findOneCourse(data: $data) {
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
        isAuth: false,
    })
}

export interface FindManyCoursesInputData {
  options?: {
    take?: number;
    skip?: number;
    searchValue?: string;
  };
}

export interface FindManyCoursesOutputData {
  results: Array<CourseEntity>;
  metadata: {
    count: number;
    categories: Array<CategoryEntity>,
    subcategories: Array<SubcategoryEntity>,
    topics: Array<TopicEntity>
  };
}

export const findManyCourses = async (
    data: FindManyCoursesInputData,
    schema: Schema<DeepPartial<FindManyCoursesOutputData>>
): Promise<FindManyCoursesOutputData> => {
    const payload = buildPayloadString(schema)
    const response = await authClient.query({
        query: gql`
            query FindManyCourses($data: FindManyCoursesInputData!) {
                findManyCourses(data: $data) {
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
        isAuth: false,
    })
}

export interface FindManyLecturesInputData {
  params: {
    sectionId: string;
  };
  options?: {
    take?: number;
    skip?: number;
  };
}

export const findManyLectures = async (
    data: FindManyLecturesInputData,
    schema: Schema<DeepPartial<LectureEntity>>
): Promise<Array<LectureEntity>> => {
    const payload = buildAuthPayloadString(schema)
    const response = await authClient.query({
        query: gql`
            query FindManyLectures($data: FindManyLecturesInputData!) {
                findManyLectures(data: $data) {
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

export interface FindOneLectureInputData {
  params: {
    lectureId: string;
  };
  options?: {
    followerId?: string;
  };
}

export const findOneLecture = async (
    data: FindOneLectureInputData,
    schema: Schema<DeepPartial<LectureEntity>>
): Promise<LectureEntity> => {
    const payload = buildAuthPayloadString(schema)
    const response = await authClient.query({
        query: gql`
            query FindOneLecture($data: FindOneLectureInputData!) {
                findOneLecture(data: $data) {              
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

export interface FindManyResourcesInputData {
  params: {
    lectureId: string;
  };
}

export const findManyResources = async (
    data: FindManyResourcesInputData,
    schema: Schema<DeepPartial<ResourceEntity>>
): Promise<Array<ResourceEntity>> => {
    const payload = buildAuthPayloadString(schema)
    const response = await authClient.query({
        query: gql`
            query FindManyResources($data: FindManyResourcesInputData!) {
                findManyResources(data: $data) {              
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

export interface FindManyCourseTargetsInputData {
  params: {
    lectureId: string;
  };
}

export const findManyCourseTargets = async (
    data: FindManyCourseTargetsInputData,
    schema: Schema<DeepPartial<CourseTargetEntity>>
): Promise<Array<CourseTargetEntity>> => {
    const payload = buildAuthPayloadString(schema)
    const response = await authClient.query({
        query: gql`
            query FindManyCourseTargets($data: FindManyCourseTargetsInputData!) {
                findManyCourseTargets(data: $data) {       
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

export const findManyCategories = async (
    schema: Schema<DeepPartial<CategoryEntity>>
): Promise<Array<CategoryEntity>> => {
    const payload = buildPayloadString(schema)
    const response = await client.query({
        query: gql`
            query FindManyCategories {
                findManyCategories {
      ${payload}
    }
  }
          `,
    })

    return getGraphqlResponseData({
        response,
        isAuth: false
    })
}
