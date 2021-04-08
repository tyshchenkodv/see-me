import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import AuthStore from './authStore';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});

ReactDOM.render(
  <React.StrictMode>
      <AuthStore>
          <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                  <App />
              </QueryClientProvider>
          </BrowserRouter>
      </AuthStore>
  </React.StrictMode>,
  document.getElementById('root')
);
