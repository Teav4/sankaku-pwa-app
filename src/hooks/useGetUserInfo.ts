import { useQuery } from 'react-query'
import { GET_MY_INFO } from '@/constants/queryKey'
import axios from 'axios'
import { GET_USER_INFO } from '@/constants/apiURL'
import { Toast } from 'antd-mobile'

export const useGetUserInfo = (username: string) =>
  useQuery(
    [GET_MY_INFO],
    async () => {
      const response = await axios.post(`${GET_USER_INFO}/${username}`)
      return response
    },
    {
      onError() {
        Toast.show(`${GET_USER_INFO} failed.`)
      }
    }
  )
