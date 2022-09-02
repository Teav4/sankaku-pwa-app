import * as React from 'react'
import { LOGIN } from '@/constants/routePath'
import { ACCESS_TOKEN } from '@/constants/storage'
import { useNavigate } from 'react-router-dom'

export function Logout(): React.ReactElement {
  const navigate = useNavigate()

  React.useEffect(() => {
    localStorage.removeItem(ACCESS_TOKEN)
    navigate(LOGIN)
  }, [])

  return <></>
}
