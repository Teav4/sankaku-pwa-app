import { ACCESS_TOKEN, USER_INFO } from '@/constants/storage'

export function useAuth() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  const userInfo = localStorage.getItem(USER_INFO)

  if (!accessToken) {
    return {
      isLogin: false,
      userInfo
    }
  }

  return {
    isLogin: true,
    userInfo
  }
}
