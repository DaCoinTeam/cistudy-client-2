import {
    CourseEntity,
    Schema,
    buildPayloadString,
    LessonEntity,
    ResourceEntity,
    buildAuthPayloadString,
    CourseTargetEntity,
    CategoryEntity,
    CourseReviewEntity,
    AccountEntity,
    SectionContentEntity,
} from "@common"
import { authClient, client, getGraphqlResponseData } from "./client"
import { gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"

export interface FindOneCourseInputData {
  params: {
    courseId: string;
    accountId?: string;
  };
}

export const findOneCourse = async (
    data: FindOneCourseInputData,
    schema: Schema<DeepPartial<CourseEntity>>
): Promise<CourseEntity> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
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
        data: graphqlData,
        isAuth: false,
    })
}

export interface FindOneCourseAuthInputData {
  params: {
    courseId: string;
  };
}

export const findOneCourseAuth = async (
    data: FindOneCourseAuthInputData,
    schema: Schema<DeepPartial<CourseEntity>>
): Promise<CourseEntity> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindOneCourseAuth($data: FindOneCourseAuthInputData!) {
    findOneCourseAuth(data: $data) {
      ${payload}
    }
  }
          `,
        variables: {
            data,
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true,
    })
}

export interface FindManyCoursesInputData {
  options?: {
    take?: number | null;
    skip?: number | null;
    searchValue?: string;
    categoryId?: string;
  };
}

export interface FindManyCoursesOutputData {
  results: Array<CourseEntity>;
  metadata: {
    count: number;
    categories: Array<CategoryEntity>;
    highRateCourses: Array<CourseEntity>;
  };
}

export const findManyCourses = async (
    data: FindManyCoursesInputData,
    schema: Schema<DeepPartial<FindManyCoursesOutputData>>
): Promise<FindManyCoursesOutputData> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
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
        data: graphqlData,
        isAuth: false,
    })
}

export interface FindManyLessonsInputData {
  params: {
    sectionId: string;
  };
  options?: {
    take?: number;
    skip?: number;
  };
}

export const findManyLessons = async (
    data: FindManyLessonsInputData,
    schema: Schema<DeepPartial<LessonEntity>>
): Promise<Array<LessonEntity>> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyLessons($data: FindManyLessonsInputData!) {
                findManyLessons(data: $data) {
    ${payload}
  }
}
        `,
        variables: {
            data,
        },
    })

    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true,
    })
}

export interface FindOneSectionContentInputData {
  params: {
    sectionContentId: string;
  };
  // options?: {
  //   followerId?: string;
  // };
}

export const findOneSectionContent = async (
    data: FindOneSectionContentInputData,
    schema: Schema<DeepPartial<SectionContentEntity>>
): Promise<SectionContentEntity> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindOneSectionContent($data: FindOneSectionContentInputData!) {
                findOneSectionContent(data: $data) {              
      ${payload}
    }
  }
          `,
        variables: {
            data,
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true,
    })
}

export interface FindManyResourcesInputData {
  params: {
    lessonId: string;
  };
}

export const findManyResources = async (
    data: FindManyResourcesInputData,
    schema: Schema<DeepPartial<ResourceEntity>>
): Promise<Array<ResourceEntity>> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
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
        data: graphqlData,
        isAuth: true,
    })
}

export interface FindManyCourseTargetsInputData {
  params: {
    courseId: string;
  };
}

export const findManyCourseTargets = async (
    data: FindManyCourseTargetsInputData,
    schema: Schema<DeepPartial<CourseTargetEntity>>
): Promise<Array<CourseTargetEntity>> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
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
        data: graphqlData,
        isAuth: true,
    })
}

export const findManyCategories = async (
    schema: Schema<DeepPartial<CategoryEntity>>
): Promise<Array<CategoryEntity>> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
           query FindManyCategories {
            findManyCategories {
      ${payload}
    }
  }
  `,
    })

    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: false,
    })
}

export interface FindManyCourseReviewsInputData {
  params: {
    courseId: string;
  };
  options?: {
    take?: number;
    skip?: number;
  };
}

export interface FindManyCourseReviewsOutputData {
  results: Array<CourseReviewEntity>;
  metadata: {
    count: number;
  };
}

export const findManyCourseReviews = async (
    data: FindManyCourseReviewsInputData,
    schema: Schema<FindManyCourseReviewsOutputData>
): Promise<FindManyCourseReviewsOutputData> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
      query FindManyCourseReviews($data: FindManyCourseReviewsInputData!) {
        findManyCourseReviews(data: $data) {       
${payload}
}
}
    `,
        variables: {
            data,
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: false,
    })
}

export interface FindManyUnverifiedCoursesInputData {
  options?: {
    take?: number;
    skip?: number;
  };
}

export interface FindManyUnverifiedCoursesOutputData {
  results: Array<CourseEntity>;
  metadata: {
    count: number;
  };
}

export const findManyUnverifiedCourses = async (
    data: FindManyUnverifiedCoursesInputData,
    schema: Schema<DeepPartial<FindManyUnverifiedCoursesOutputData>>
): Promise<FindManyUnverifiedCoursesOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
      query FindManyUnverifiedCourses($data: FindManyUnverifiedCourseInputData!) {
        findManyUnverifiedCourses(data: $data) {
${payload}
}
}
    `,
        variables: {
            data,
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true,
    })
}

export interface HighlightDTO {
  highRatedCourses: Array<CourseEntity>;
  highRatedInstructors: Array<AccountEntity>;
  mostEnrolledCourses: Array<CourseEntity>;
  recentlyAddedCourses: Array<CourseEntity>;
  totalNumberOfAvailableCourses: number;
  totalNumberOfPosts: number;
  totalNumberOfVerifiedAccounts: number;
}

export const initLandingPage = async (
    schema: Schema<DeepPartial<HighlightDTO>>
): Promise<HighlightDTO> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
          query InitLandingPage {
            initLandingPage {
  ${payload}
}
}
      `,
    })

    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: false,
    })
}
