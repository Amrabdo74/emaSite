import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
]);

