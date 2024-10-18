import { Navigate, useRoutes } from 'react-router-dom';
// Layout
import AuthLayout from './layout/AuthLayout';
import AppLayout from './layout/AppLayout';
// Auth Pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// App Pages
import ToDoList from './components/app/ToDoList';
// ----------------------------------------------------------------------
export default function Router() {
  
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <AppLayout/>,
      children: [
        {
          path: 'list',
          element: <ToDoList/>
        }
      ] 
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { element: <Navigate to="/register" />, index: true },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return routes;
}
