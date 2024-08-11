import { DeepPartial } from "@apollo/client/utilities"
import { buildAuthPayloadString, OrderEntity, Schema } from "@common"
import { authClient, getGraphqlResponseData } from "./client"
import { gql } from "@apollo/client"

export interface FindManyAccountOrdersInput {
  options: {
    skip?: number;
    take?: number;
    orderStatus?: boolean;
  };
}

export interface FindManyAccountOrdersOutput {
  results: Array<OrderEntity>;
  metadata: {
    count: number;
  };
}

export const findManyAccountOrders = async (
    data: FindManyAccountOrdersInput,
    schema?: Schema<DeepPartial<FindManyAccountOrdersOutput>>
): Promise<FindManyAccountOrdersOutput> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
        query FindManyAccountOrders($data: FindManyAccountOrdersInputData!) {
          findManyAccountOrders(data: $data)   {
  ${payload}
    }}
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



export interface FindManyOrdersInput {
  options: {
    skip?: number;
    take?: number;
    orderStatus?: boolean;
  };
}

export interface FindManyOrdersOutput {
  results: Array<OrderEntity>;
  metadata: {
    count: number;
  };
}

export const findManyOrders = async (
    data: FindManyOrdersInput,
    schema?: Schema<DeepPartial<FindManyOrdersOutput>>
): Promise<FindManyOrdersOutput> => {
    const payload = buildAuthPayloadString(schema)
    const { data: graphqlData } = await authClient.query({
        query: gql`
        query FindManyOrders($data: FindManyOrdersInputData!) {
          findManyOrders(data: $data)   {
  ${payload}
    }}
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
