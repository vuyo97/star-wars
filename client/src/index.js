import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import * as serviceWorker from './serviceWorker';
import 'w3-css/w3.css';

const client = new ApolloClient({
    uri:'http://localhost:4000/graphql'
})

ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App perPage={5}/>
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  serviceWorker.unregister();