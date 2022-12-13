import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage.jsx';
import './index.css';

import PersonPage from './pages/PersonPage.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
// import SignInSide from './sign-in-side/SignInSide.jsx';
import { CreatePostPage } from './pages/CreatePostPage.jsx';
import { SignUpPage } from './pages/SignUpPage.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
// <img src="" />

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  
  {
    path: "/homepage",
    element: <HomePage/>
  },
  {
    path: '/user/:username',
    element: <PersonPage />
  },
  {
    path: '/createpost',
    element: <CreatePostPage />
  },
  {
    path: "/signup",
    element: <SignUpPage/>
  },


])

root.render(
  <React.StrictMode>
    <RouterProvider router={reactRouter} />    {/* <Calculator/>, <Result /> */}
    
  </React.StrictMode>
);