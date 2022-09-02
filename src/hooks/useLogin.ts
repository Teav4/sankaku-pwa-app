import { LOGIN } from '@/constants/apiURL'
import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { HOME } from '@/constants/routePath'
import { ACCESS_TOKEN } from '@/constants/storage'
import { LoginResponse } from '@/types/auth'

export interface LoginRequirementProps {
  username: string
  password: string
}

export function useLogin() {
  const navigate = useNavigate()

  return useMutation(
    async (loginData: LoginRequirementProps) => {
      const response = await axios.post<
        LoginRequirementProps,
        AxiosResponse<LoginResponse>
      >(
        LOGIN,
        {
          login: loginData.username,
          password: loginData.password
        },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )

      return response
    },
    {
      onSuccess(response) {
        const accessToken = response.data.access_token
        localStorage.setItem(ACCESS_TOKEN, accessToken)
        setTimeout(() => navigate(HOME), 1000)
      },
      onError() {
        Toast.show('Login Failed')
      }
    }
  )
}
