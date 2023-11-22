import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import PublicWrapper from '../pages/public/PublicWrapper';
import { Login } from '../pages/auth/login';
import Registartion from '../pages/auth/registration';
import { PATH } from '../consts';
import AdminWrapper from '../pages/admin/AdminWrapper';
import PublicUser from '../pages/public/user';
import PublicTeam from '../pages/public/team';
import PublicEvent from '../pages/public/event';
import PublicChallenge from '../pages/public/challenge';
import AdminUser from '../pages/admin/user';
import AdminTeam from '../pages/admin/team';
import AdminEvent from '../pages/admin/event';
import AdminChallenge from '../pages/admin/challenge';
import ProfileMePage from '../pages/auth/profile';


export const Router = createBrowserRouter([
    {
      path: PATH.AUTH.LOGIN,
      element: <Login/>,
    },
    {
      path: PATH.AUTH.REGISTRATION,
      element: <Registartion/>,
    },
    {
      path: '/',
      element: <Navigate to={PATH.AUTH.LOGIN} />
    },
    {
      path: PATH.PUBLIC.HOME,
      element: <PublicWrapper />,
      children: [
        {
          path: PATH.PUBLIC.TEAM,
          element: <PublicTeam />
        },
        {
          path: PATH.PUBLIC.USER,
          element: <PublicUser />
        },
        {
          path: PATH.PUBLIC.ME,
          element: <ProfileMePage />
        },
        {
          path: PATH.PUBLIC.EVENT,
          element: <PublicEvent />
        },
        {
          path: PATH.PUBLIC.CHALLENGE,
          element: <PublicChallenge />
        }
      ]
    },
    {
      path: PATH.ADMIN.HOME,
      element: <AdminWrapper />,
      children: [
        {
          path: PATH.ADMIN.USER,
          element: <AdminUser />
        },
        {
          path: PATH.ADMIN.TEAM,
          element: <AdminTeam />
        },
        {
          path: PATH.ADMIN.EVENT,
          element: <AdminEvent />
        },
        {
          path: PATH.ADMIN.CHALLENGE,
          element: <AdminChallenge />
        },
      ]
    }
]);
