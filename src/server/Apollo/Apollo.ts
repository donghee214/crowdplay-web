import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';



const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true
    }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
        addTypename: false
    })
    // credentials: 'include',
    // request: (operation) => {
    //     const token = localStorage.getItem('token')
    //     operation.setContext({
    //         headers: {
    //             authorization: token ? `Bearer ${token}` : ''
    //         }
    //     });
    // }
})

export default client