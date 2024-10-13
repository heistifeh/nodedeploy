import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'swiper/css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './home/Home.jsx';
import Verify from './verify/Verify.jsx';
import GiftCardList from './components/GiftCardList';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create a root.

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: '/', // Generally, this would be the landing or main page.
        element: <Home />
      },
      {
        path: '/verify', // Example path for the Verify component.
        element: <Verify />
      },
      {
        path: '/giftcardlist', // Example path for the Verify component.
        element: <GiftCardList />
      }
    ]
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
