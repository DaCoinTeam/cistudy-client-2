import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { endpointConfig } from "@config"
import { AuthTokenType, getAuthToken, getClientId } from "@common"

const httpLink = createHttpLink({
    uri: endpointConfig().graphql,
})

const link = (type: AuthTokenType | null = null) =>
    setContext((_, { headers }) => {
        if (!type) return headers
        const token = getAuthToken(type)
        return {
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : "",
                "Client-Id": getClientId()
            },
        }
    })

export const client = (type: AuthTokenType | null = null) =>
    new ApolloClient({
        link: link(type).concat(httpLink),
        cache: new InMemoryCache(),
    })
