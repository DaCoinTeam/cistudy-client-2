import { gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"
import {
    buildAuthPayloadString,
    CourseEntity,
    Schema,
    TransactionEntity,
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
    const { data: graphqlData } = await authClient.query({
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
        data: graphqlData,
        isAuth: true,
    })
}

export interface FindManyEnrolledCoursesInputData {
  options?: {
    skip?: number;
    take?: number;
  };
}

export interface FindManyEnrolledCoursesOutputData {
  results: Array<CourseEntity>;
  metadata: {
    count: number;
  };
}

export const findManyEnrolledCourses = async (
    data: FindManyEnrolledCoursesInputData,
    schema: Schema<DeepPartial<FindManyEnrolledCoursesOutputData>>
): Promise<FindManyEnrolledCoursesOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyEnrolledCourses($data: FindManyEnrolledCoursesInputData!) {
                findManyEnrolledCourses(data: $data) {
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




export interface FindManyTransactionsInputData {
  options?: {
    skip?: number;
    take?: number;
  };
}

export interface FindManyTransactionsOutputData {
  results: Array<TransactionEntity>;
  metadata: {
    count: number;
  };
}

export const findManyTransactions = async (
    data: FindManyTransactionsInputData,
    schema: Schema<DeepPartial<FindManyTransactionsOutputData>>
): Promise<FindManyTransactionsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyTransactions($data: FindManyTransactionsInputData!) {
                findManyTransactions(data: $data) {
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
