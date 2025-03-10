import { useState, useEffect, useCallback } from 'react'
import { Axios, AxiosResponse } from '@/config/http'

export default function useQuery<T>(url: string, lazy = false) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setData(null)

    try {
      const res: AxiosResponse<T> = await Axios.get<T>(url)
      setData(res.data)
      setError(null)
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (!lazy) fetchData()
  }, [fetchData, lazy])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}
