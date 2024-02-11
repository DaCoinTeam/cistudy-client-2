export const endpointConfig = () => ({
    api: process.env.NEXT_PUBLIC_SERVER_ENDPOINT_API as string,
    graphql: process.env.NEXT_PUBLIC_SERVER_ENDPOINT_GRAPHQL as string,
})
