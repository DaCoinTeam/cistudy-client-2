import { DeepPartial } from "@apollo/client/utilities"
import { buildAuthPayloadString, ReportAccountEntity, ReportCourseEntity, ReportPostCommentEntity, ReportPostEntity, Schema } from "@common"
import { authClient, getGraphqlResponseData } from "./client"
import { gql } from "@apollo/client"

export interface FindManyAccountReportsInputData {
    options?: {
        skip?: number;
        take?: number;
    };
}

export interface FindManyAccountReportsOutputData {
    results: Array<ReportAccountEntity>;
    metadata: {
        count: number;
    };
}

export const findManyAccountReports = async(
    data: FindManyAccountReportsInputData,
    schema: Schema<DeepPartial<FindManyAccountReportsOutputData>>
): Promise<FindManyAccountReportsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyAccountReports($data: FindManyAccountReportsInputData!) {
                findManyAccountReports(data: $data) {
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

export interface FindManyCourseReportsInputData {
    options?: {
        skip?: number;
        take?: number;
    };
}

export interface FindManyCourseReportsOutputData {
    results: Array<ReportCourseEntity>;
    metadata: {
        count: number;
    };
}

export const findManyCourseReports = async(
    data: FindManyCourseReportsInputData,
    schema: Schema<DeepPartial<FindManyCourseReportsOutputData>>
): Promise<FindManyCourseReportsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyCourseReports($data: FindManyCourseReportsInputData!) {
                findManyCourseReports(data: $data) {
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

export interface FindManyPostReportsInputData {
    options?: {
        skip?: number;
        take?: number;
    };
}

export interface FindManyPostReportsOutputData {
    results: Array<ReportPostEntity>;
    metadata: {
        count: number;
    };
}

export const findManyPostReports = async(
    data: FindManyPostReportsInputData,
    schema: Schema<DeepPartial<FindManyPostReportsOutputData>>
): Promise<FindManyPostReportsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyPostReports($data: FindManyPostReportsInputData!) {
                findManyPostReports(data: $data) {
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

export interface FindManyPostCommentReportsInputData {
    options?: {
        skip?: number;
        take?: number;
    };
}

export interface FindManyPostCommentReportsOutputData {
    results: Array<ReportPostCommentEntity>;
    metadata: {
        count: number;
    };
}

export const findManyPostCommentReports = async(
    data: FindManyPostCommentReportsInputData,
    schema: Schema<DeepPartial<FindManyPostCommentReportsOutputData>>
): Promise<FindManyPostCommentReportsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyPostCommentReports($data: FindManyPostCommentReportsInputData!) {
                findManyPostCommentReports(data: $data) {
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