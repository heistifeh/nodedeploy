import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'swiper/css';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from './home/Home.jsx';
import Verify from './verify/Verify.jsx';
import GiftCardList from './components/GiftCardList';
import Login from './components/Login';

// Authenticated Route Wrapper
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Check if token exists
  return token ? element : <Navigate to="/login" />; // Redirect if not authenticated
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/', 
        element: <Home /> // Public Route
      },
      {
        path: '/verify',
        element: <Verify /> // Public Route
      },
      {
        path: '/login',
        element: <Login /> // Public Route for Login
      },
      {
        path: '/giftcardlist', // Protected Route
        element: <PrivateRoute element={<GiftCardList />} />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create a root.

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
