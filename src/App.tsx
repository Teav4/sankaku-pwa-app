import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { authRoute, noAuthRoutes } from '@/routes'
import { NotFound } from './pages/404NotFound'
import { LayoutWithAuth, LayoutWithNoAuth } from '@/components/Layout'
import * as routePath from '@/constants/routePath'

function App() {
  const authStatus = useAuth()

  return (
    <Routes>
      {noAuthRoutes.map(({ path, Component }, index) => (
        <Route
          element={
            authStatus.isLogin ? (
              <Navigate replace to={routePath.HOME} />
            ) : (
              <LayoutWithNoAuth>
                <Component />
              </LayoutWithNoAuth>
            )
          }
          key={index}
          path={path}
        />
      ))}
      {authRoute.map(({ path, Component }, index) => (
        <Route
          element={
            !authStatus.isLogin ? (
              <Navigate replace to={routePath.LOGIN} />
            ) : (
              <LayoutWithAuth>
                <Component />
              </LayoutWithAuth>
            )
          }
          key={index}
          path={path}
        />
      ))}
      <Route
        element={
          <LayoutWithNoAuth>
            <NotFound />
          </LayoutWithNoAuth>
        }
        path={routePath.NOT_FOUND}
      />
    </Routes>
  )
}

export default App
