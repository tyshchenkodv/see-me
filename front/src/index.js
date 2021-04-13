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
import ArticlesStore from './articlesStore';

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
          <ArticlesStore>
              <BrowserRouter>
                  <QueryClientProvider client={queryClient}>
                      <App />
                  </QueryClientProvider>
              </BrowserRouter>
          </ArticlesStore>
      </AuthStore>
  </React.StrictMode>,
  document.getElementById('root')
);
