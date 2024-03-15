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
    AuthTokens,
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

const beforeAuthLink = new ApolloLink((operation, forward) => {
    const token = getAuthToken()
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Client-Id": getClientId(),
        },
    })
    return forward(operation)
})

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) console.log(`[Graphql error]: ${graphQLErrors}`)
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const onErrorAuthLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            const error = graphQLErrors[0].extensions.originalError as ErrorResponse
            if (error.statusCode === ErrorStatusCode.Unauthorized) {
                const token = getAuthToken(AuthTokenType.Refresh)
                operation.setContext({
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                        "Client-Id": getClientId(),
                    },
                })
                return forward(operation)
            }
        }
        if (networkError) console.log(`[Network error]: ${networkError}`)
    }
)

export const client = new ApolloClient({
    link: from([onErrorLink, httpLink]),
    cache: new InMemoryCache(),
})

export const authClient = new ApolloClient({
    link: from([
        beforeAuthLink,
        onErrorAuthLink,
        httpLink,
    ]),
    cache: new InMemoryCache(),
})

export const getGraphqlResponseData = <T>(
    params: {
        isAuth: false
        response: ApolloQueryResult<T>
    } | {
        isAuth: true
        response: ApolloQueryResult<BaseResponse<T>>
    }
) => {
    const { isAuth, response } = params
    const data = response.data! 
    if (!isAuth) {
        return Object.values(data).at(0) as T
    } else {
        const graphqlData = Object.values(data).at(0) as T
        const tokens = Object.values(data).at(1) as AuthTokens
        if (tokens) saveTokens(tokens)
        return graphqlData
    }
}