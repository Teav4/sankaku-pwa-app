import * as routePath from '@/constants/routePath'
import { Home } from '@/pages/Home'

export const authRoute: RouteProps[] = [
  {
    path: routePath.HOME,
    Component: Home
  }
]
