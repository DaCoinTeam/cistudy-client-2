import { gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"
import {
    CourseEntity,
    Schema,
    AccountEntity,
    buildAuthPayloadString,
    buildPayloadString,
} from "@common"
import { authClient, client, getGraphqlResponseData } from "./client"

export interface FindOneAccountInputData {
    params: {
        accountId: string;
    },
    options?: {
        followerId?: string;
    };
}

export const findOneAccount = async (
    data: FindOneAccountInputData,
    schema?: Schema<DeepPartial<AccountEntity>>
): Promise<AccountEntity> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
            query FindOneAccount($data: FindOneAccountInputData!) {
                findOneAccount(data: $data)   {
      ${payload}
    }
  }
          `,
        variables: {
            data
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: false
    })
}

export interface FindManyFollowersInputData {
    params: {
        accountId: string;
    },
}

export const findManyFollowers = async (
    data: FindManyFollowersInputData,
    schema?: Schema<DeepPartial<AccountEntity>>
): Promise<Array<AccountEntity>> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
            query FindManyFollowers($data: FindManyFollowersInputData!) {
                findManyFollowers(data: $data)   {
      ${payload}
    }
  }
          `,
        variables: {
            data
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: false
    })
}

export interface FindManyCreatedCoursesInputData {
    params: {
        accountId: string;
    },
    options?: {
        skip?: number;
        take?: number;
    }
}

export const findManyCreatedCourses = async (
    data: FindManyCreatedCoursesInputData,
    schema?: Schema<DeepPartial<CourseEntity>>
): Promise<Array<CourseEntity>> => {
    const payload = buildPayloadString(schema)
    const { data: graphqlData } = await client.query({
        query: gql`
            query FindManyCreatedCourses($data: FindManyCreatedCoursesInputData!) {
                findManyCreatedCourses(data: $data)   {
      ${payload}
    }
  }
          `,
        variables: {
            data
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: false
    })
}

export interface FindManyAccountsInputData {
    options?: {
        take?: number;
        skip?: number;
    };
}

export interface FindManyAccountsOutputData {
    results: Array<AccountEntity>;
    metadata: {
        count: number;
    };
}

export const findManyAccounts = async (
    data: FindManyAccountsInputData,
    schema?: Schema<DeepPartial<FindManyAccountsOutputData>>
): Promise<FindManyAccountsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyAccounts($data: FindManyAccountsInputData!) {
                findManyAccounts(data: $data)   {
      ${payload}
    }
  }
          `,
        variables: {
            data
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true
    })
}