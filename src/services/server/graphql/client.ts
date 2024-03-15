/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ApolloClient,
    ApolloLink,
    ApolloQueryResult,
    InMemoryCache,
    createHttpLink,
    from,
} from "@apollo/client"
import { GRAPHQL_ENDPOINT } from "@config"
import {
    AuthTokenType,
    BaseResponse,
    ErrorResponse,
    ErrorStatusCode,
    getAuthToken,
    getClientId,
    saveTokens,
} from "@common"
import { onError } from "@apollo/client/link/error"

const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
})

const beforeLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            "Client-Id": getClientId(),
        },
    })
    return forward(operation)
})

const beforeAuthLink = new ApolloLink((operation, forward) => {
    const token = getAuthToken()
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Client-Id": getClientId(),
            "Auth-Token-Type": AuthTokenType.Access,
        },
    })
    return forward(operation)
})

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) throw graphQLErrors[0].extensions.originalError
    if (networkError) throw networkError
})

const onErrorAuthLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            const error = graphQLErrors[0].extensions.originalError as ErrorResponse
            if (error.statusCode === ErrorStatusCode.Unauthorized) {
                const context = operation.getContext()
                const headers = context.headers
                if (headers === AuthTokenType.Refresh)
                    throw graphQLErrors

                const token = getAuthToken(AuthTokenType.Refresh)
                operation.setContext({
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                        "Client-Id": getClientId(),
                        "Auth-Token-Type": AuthTokenType.Refresh,
                    },
                })
                return forward(operation)
            }
        }
        if (networkError) throw networkError
    }
)

export const client = new ApolloClient({
    link: from([beforeLink, onErrorLink, httpLink]),
    cache: new InMemoryCache(),
})

export const authClient = new ApolloClient({
    link: from([beforeAuthLink, onErrorAuthLink, httpLink]),
    cache: new InMemoryCache(),
})

export const getGraphqlResponseData = <T>(
    params:
    | {
        isAuth: false;
        response: ApolloQueryResult<T>;
      }
    | {
        isAuth: true;
        response: ApolloQueryResult<BaseResponse<T>>;
      }
) => {
    const { isAuth, response } = params
    const data = response.data!
    if (!isAuth) {
        return Object.values(data).at(0) as T
    } else {
        const baseResponse = Object.values(data).at(0) as BaseResponse<T>
        const { data: graphqlData, tokens } = { ...baseResponse }
        if (tokens) saveTokens(tokens)
        return graphqlData
    }
}
