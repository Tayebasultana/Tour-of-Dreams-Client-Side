import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './components/AuthProvider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> 
      {/* <HelmetProvider> */}
      <AuthProvider routes={<RouterProvider router={router}></RouterProvider>} />
      <Toaster />
      {/* </HelmetProvider> */}
    </QueryClientProvider>
  </StrictMode>
);
