import { createBrowserRouter } from 'react-router-dom';
import Wrapper from '../pages/Wrapper';
import { Login } from '../pages/login';
import Registartion from '../pages/registration';
import Team from '../pages/team';
import User from '../pages/user';
import Event from '../pages/event';
import Challenge from '../pages/challenge';


export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  HOME: '/',
  TEAM: '/team',
  USER: '/user',
  CHALLENGE: '/challenge',
  EVENT: '/event',
}

export const Router = createBrowserRouter([
    {
      path: PATH.LOGIN,
      element: <Login/>,
    },
    {
      path: PATH.REGISTRATION,
      element: <Registartion/>,
    },
    {
      path: PATH.HOME,
      element: <Wrapper/>,
      children: [
        {
          path: PATH.TEAM,
          element: <Team />
        },
        {
          path: PATH.USER,
          element: <User />
        },
        {
          path: PATH.EVENT,
          element: <Event />
        },
        {
          path: PATH.CHALLENGE,
          element: <Challenge />
        }
      ]
    }
]);
