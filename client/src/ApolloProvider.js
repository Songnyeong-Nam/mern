import React from 'react'
import App from './App'
import { createHttpLink, InMemoryCache, ApolloProvider, ApolloClient} from '@apollo/client'
import {setContext} from 'apollo-link-context'

const authLink = setContext(()=> {
    const token = localStorage.getItem('jwtToken');
    return{
        headers: {
            Authorization: token? `Bearer ${token}`: ''
        }
    }
})
const httplink = createHttpLink({
    uri:'http://localhost:5000'
})
const client = new ApolloClient({
    link: authLink.concat(httplink),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
) 