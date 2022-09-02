import { ACCESS_TOKEN } from '@/constants/storage'
import axios from 'axios'

export const configAxios = () => {
  axios.interceptors.request.use((config) => {
    if (config.headers && !config.headers['authorization']) {
      const accessToken = localStorage.getItem(ACCESS_TOKEN)
      if (accessToken) {
        config.headers['authorization'] = `Bearer ${accessToken}`
      }
    }

    return config
  })
}
