import React from 'react';
import { ConfigProvider, theme } from 'antd';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './Components/Login/Login';
import Jobs from './Components/pages/Employer/Jobs';
import Opportunities from './Components/pages/Seeker/Opportunities/Opportunities';
import UserProfile from './Components/pages/Seeker/UserProfile/UserProfile';
import RootLayout from './Components/pages/Root';
import Error from './Components/pages/Error';
import './App.scss';

const router = createBrowserRouter([
  { path: '/', element: <RootLayout />, errorElement: <Error />,
    children: [
      { path: '/', element: <Login />},
      { path: '/profile', element: <UserProfile />},
      { path: '/opportunities', element: <Opportunities />},
      { path: '/jobs', element: <Jobs />}
    ]
  },
  
]);


function App() {
  const { darkAlgorithm } = theme;
    return (
    
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}
      >
        <RouterProvider router = {router} />
      </ConfigProvider>
  );
}

export default App;
