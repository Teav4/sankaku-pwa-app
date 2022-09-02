import * as routePath from '@/constants/routePath'
import { Login } from '@/pages/Login'

export const noAuthRoutes: RouteProps[] = [
  {
    path: routePath.LOGIN,
    Component: Login
  }
]
