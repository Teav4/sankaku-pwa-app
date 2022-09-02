import * as routePath from '@/constants/routePath'
import { Home } from '@/pages/Home'
import { AdvanceSearch } from '@/pages/AdvanceSearch'
import { Logout } from '@/pages/Logout'

export const authRoute: RouteProps[] = [
  {
    path: routePath.HOME,
    Component: Home
  },
  {
    path: routePath.SEARCH,
    Component: AdvanceSearch
  },
  {
    path: routePath.LOGOUT,
    Component: Logout
  }
]
