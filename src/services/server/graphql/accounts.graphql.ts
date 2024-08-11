import { gql } from "@apollo/client"
import { DeepPartial } from "@apollo/client/utilities"
import {
    CourseEntity,
    Schema,
    AccountEntity,
    buildAuthPayloadString,
    buildPayloadString,
    NotificationEntity,
    TransactionEntity,
} from "@common"
import { authClient, client, getGraphqlResponseData } from "./client"

export interface FindOneAccountInputData {
  params: {
    accountId: string;
  };
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
            data,
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: false,
    })
}

export interface FindManyFollowersInputData {
  params: {
    accountId: string;
  };
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
            data,
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: false,
    })
}

export interface FindManyCreatedCoursesInputData {
  params: {
    accountId: string;
  };
  options?: {
    skip?: number;
    take?: number;
  };
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
            data,
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: false,
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
            data,
        },
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true,
    })
}

export interface FindManyNotificationsInputData {
  options?: {
    take?: number;
    skip?: number;
  };
}

export interface FindManyNotificationsOutputData {
  results: Array<NotificationEntity>;
  metadata: {
    count: number;
  };
}

export const findManyNotifications = async (
    data: FindManyNotificationsInputData,
    schema?: Schema<DeepPartial<FindManyNotificationsOutputData>>
): Promise<FindManyNotificationsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyNotifications($data: FindManyNotificationsInputData!) {
                findManyNotifications(data: $data)   {
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

export interface FindManyAdminTransactionsInputData {
  options?: {
    take?: number;
    skip?: number;
  };
}

export interface FindManyAdminTransactionsOutputData {
  results: Array<TransactionEntity>;
  metadata: {
    count: number;
  };
}

export const findManyAdminTransactions = async (
    data: FindManyAdminTransactionsInputData,
    schema?: Schema<DeepPartial<FindManyAdminTransactionsOutputData>>
): Promise<FindManyAdminTransactionsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query FindManyAdminTransactions($data: FindManyAdminTransactionsInputData!) {
                findManyAdminTransactions(data: $data)   {
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

export interface GetAdminAnalyticsOutputData {
  numberOfAccounts: number;
  numberOfCourses: number;
  numberOfTransactions: number;
  numberOfOrders: number;
}

export const getAdminAnalytics = async (
    schema?: Schema<DeepPartial<GetAdminAnalyticsOutputData>>
): Promise<GetAdminAnalyticsOutputData> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
            query GetAdminAnalytics {
                getAdminAnalytics {
      ${payload}
    }
  }
          `,
    })
    return getGraphqlResponseData({
        data: graphqlData,
        isAuth: true,
    })
}
