import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import PublicWrapper from '../pages/public/PublicWrapper';
import { Login } from '../pages/auth/login';
import Registartion from '../pages/auth/registration';
import { PATH } from '../consts';
import AdminWrapper from '../pages/admin/AdminWrapper';
import PublicUser from '../pages/public/user';
import PublicTeam from '../pages/public/team';
import PublicTask from '../pages/public/task';
import PublicEvent from '../pages/public/event';
import AdminUser from '../pages/admin/user';
import AdminTeam from '../pages/admin/team';
import AdminTask from '../pages/admin/event';
import AdminEvent from '../pages/admin/event';
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
          path: PATH.PUBLIC.TASK,
          element: <PublicTask />
        },
        {
          path: PATH.PUBLIC.EVENT,
          element: <PublicEvent />
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
          path: PATH.ADMIN.TASK,
          element: <AdminTask />
        },
        {
          path: PATH.ADMIN.EVENT,
          element: <AdminEvent />
        },
      ]
    }
]);
