import * as routePath from '@/constants/routePath'
import { Home } from '@/pages/Home'
import { AdvanceSearch } from '@/pages/AdvanceSearch'
import { Logout } from '@/pages/Logout'
import { ViewImage } from '@/pages/ViewImage'

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
  },
  {
    path: routePath.VIEW_IMAGE,
    Component: ViewImage
  }
]
