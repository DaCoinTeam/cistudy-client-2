import { DeepPartial } from "@apollo/client/utilities"
import { Schema, TransactionEntity, buildPayloadString } from "@common"
import { client, getGraphqlResponseData } from "./client"
import { gql } from "@apollo/client"

export interface FindManyTransactionInputData {
    options?: {
      skip?: number;
      take?: number;
    };
  }
  
export interface FindManyTransactionOutput {
    results: Array<TransactionEntity>;
    metadata: {
      count: number;
    };
  }

export const findManyTransactions = async (
    data: FindManyTransactionInputData,
    schema: Schema<DeepPartial<FindManyTransactionOutput>>,
): Promise<FindManyTransactionOutput> => {
    const payload = buildPayloadString(schema)

    const { data: graphqlData } = await client.query({
        query: gql`
            query FindManyTransactions($data: FindManyTransactionsInputData!) {
                findManyTransactions(data: $data) {
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
