import {FC} from 'react';
import {Box} from '@mui/material';
import Login from './pages/Login';
import CreateEntry from "./pages/CreateEntry";
import Timeline from "./pages/Timeline";

interface Route {
  key: string,
  title: string,
  path: string,
  enabled: boolean,
  component: FC<{}>
};

export const routes: Array<Route> = [
  {
    key: 'login',
    title: 'Login',
    path: '/login',
    enabled: true,
    component: () => (<Login />)
  },
  {
    key: 'timeline',
    title: 'Timeline',
    path: '/',
    enabled: true,
    component: () => (<Timeline />)
  },
  {
    key: 'create',
    title: 'Create',
    path: '/create',
    enabled: true,
    component: () => (<CreateEntry />)
  },
  {
    key: 'profile',
    title: 'Profile',
    path: '/profile',
    enabled: true,
    component: () => (<Box>Profile</Box>)
  }
];