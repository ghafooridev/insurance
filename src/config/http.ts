import axios, { AxiosResponse } from 'axios'

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || ''
})

export type { AxiosResponse }
