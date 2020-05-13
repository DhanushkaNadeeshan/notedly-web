import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, createHttpLink} from '@apollo/client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

// import global styles
import GlobalStyle from '/components/GlobalStyle';
// import routes
import Pages from '/pages';

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();


// check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
  return {
    headers: { ...headers, authorization: localStorage.getItem('token') || '' }
  }
});
// Config our appolo server
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

const data = {isLoggedIn : !! localStorage.getItem("token")};
// Check this
cache.writeData({ data });
client.onResetStore(() => cache.writeData({ data }));



const App = () => {
  return (

    <ApolloProvider client={client}>

      <GlobalStyle />
      <Pages />
    </ApolloProvider>


  );
};

ReactDOM.render(<App />, document.getElementById('root'));