import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import * as serviceWorker from './serviceWorker';
Modal.setAppElement('#root');

const client = new ApolloClient({
    uri:'http://localhost:4000/graphql'
})

ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  serviceWorker.unregister();