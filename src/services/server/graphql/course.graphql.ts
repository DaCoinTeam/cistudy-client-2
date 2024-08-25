import { gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"
import {
    AccountEntity,
    buildAuthPayloadString,
    buildPayloadString,
    CategoryEntity,
    CertificateEntity,
    CourseEntity,
    CourseReviewEntity,
    CourseTargetEntity,
    LessonEntity,
    PostEntity,
    QuizAttemptEntity,
    ResourceEntity,
    Schema,
    SectionContentEntity,
} from "@common"
import { authClient, client, getGraphqlResponseData } from "./client"

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
    accountId: string;
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
  params: {
    accountId?: string | null;
  };
  options?: {
    take?: number;
    skip?: number;
    searchValue?: string;
    categoryIds?: Array<string>;
  };
}

export interface FindManyCoursesOutputData {
  results: Array<CourseEntity>;
  metadata: {
    count: number;
    relativeTopics: Array<CategoryEntity>;
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
export interface FindManyLevelCategoriesInputData {
  params: {
    level: number;
  };
}

export const findManyLevelCategories = async (
    data: FindManyLevelCategoriesInputData,
    schema: Schema<DeepPartial<CategoryEntity>>
): Promise<Array<CategoryEntity>> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
         query FindManyLevelCategories($data: FindManyLevelCategoriesInputData!) {
          findManyLevelCategories(data: $data) {
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

export interface FindManyPendingCoursesInputData {
  options?: {
    take?: number;
    skip?: number;
  };
}

export interface FindManyPendingCoursesOutputData {
  results: Array<CourseEntity>;
  metadata: {
    count: number;
  };
}

export const findManyPendingCourses = async (
    data: FindManyPendingCoursesInputData,
    schema: Schema<DeepPartial<FindManyPendingCoursesOutputData>>
): Promise<FindManyPendingCoursesOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
      query findManyPendingCourses($data: FindManyPendingCourseInputData!) {
        findManyPendingCourses(data: $data) {
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

export interface Highlight {
  highRatedCourses: Array<CourseEntity>;
  highRatedInstructors: Array<AccountEntity>;
  mostEnrolledCourses: Array<CourseEntity>;
  recentlyAddedCourses: Array<CourseEntity>;
  totalNumberOfAvailableCourses: number;
  totalNumberOfPosts: number;
  totalNumberOfVerifiedAccounts: number;
}

export const initLandingPage = async (
    schema: Schema<DeepPartial<Highlight>>
): Promise<Highlight> => {
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

export interface FindOneCertificateInputData {
  certificateId: string;
}

export const findOneCertificate = async (
    data: FindOneCertificateInputData,
    schema: Schema<DeepPartial<CertificateEntity>>
): Promise<CertificateEntity> => {
    const payload = buildPayloadString(schema)
    const {data: graphqlData} = await client.query({
        query: gql`
          query FindOneCertificate($data: FindOneCertificateInputData!) {
  findOneCertificate(data: $data) {
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

export interface FindManyQuizAttemptsInputData {
  params: {
    quizId: string;
  };
  options: {
    skip?: number;
    take?: number;
  };
}

export interface FindManyQuizAttemptsOutputData {
  results: Array<QuizAttemptEntity>;
  metadata: {
    count: number;
  };
}

export const findManyQuizAttempts = async (
    data: FindManyQuizAttemptsInputData,
    schema: Schema<DeepPartial<FindManyQuizAttemptsOutputData>>
): Promise<FindManyQuizAttemptsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyQuizAttempts($data: FindManyQuizAttemptsInputData!) {
    findManyQuizAttempts(data: $data) {
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

export interface GetCourseStatisticParams {
  courseId: string;
}

export interface GetCourseStatisticInputData {
  params: GetCourseStatisticParams;
}

export interface GetCourseStatisticOutputData {
  numberOfRewardablePostsLeft?: number;
  totalEarning?: number;
  likePosts?: Array<PostEntity>;
  commentPosts?: Array<PostEntity>;
  markedPosts?: Array<PostEntity>;
  createdPosts?: Array<PostEntity>;
}

export const getCourseStatistic = async (
    data: GetCourseStatisticInputData,
    schema: Schema<DeepPartial<GetCourseStatisticOutputData>>
): Promise<GetCourseStatisticOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
          query GetCourseStatistic($data: GetCourseStatisticInputData!) {
  getCourseStatistic(data: $data) {
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
