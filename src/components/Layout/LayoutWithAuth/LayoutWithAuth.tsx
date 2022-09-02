import * as React from 'react'
import { Navbar } from '@nextui-org/react'
import { HOME, LOGOUT, SEARCH } from '@/constants/routePath'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactElement
}

export function LayoutWithAuth({ children }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <Navbar isBordered isCompact variant={'static'}>
        <Navbar.Content>
          <Navbar.Link
            isActive={HOME === pathname}
            onClick={() => navigate(HOME)}
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            isActive={SEARCH === pathname}
            onClick={() => navigate(SEARCH)}
          >
            Search
          </Navbar.Link>
          <Navbar.Link
            isActive={LOGOUT === pathname}
            onClick={() => navigate(LOGOUT)}
          >
            Logout
          </Navbar.Link>
        </Navbar.Content>
      </Navbar>
      {children}
    </>
  )
}
