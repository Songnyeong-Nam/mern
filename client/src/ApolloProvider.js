import React from 'react'
import App from './App'
import { createHttpLink, InMemoryCache, ApolloProvider, ApolloClient} from '@apollo/client'

// const httpLink = createHttpLink({
    
// })

const client = new ApolloClient({
    uri: 'http://localhost:5000',
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
) 