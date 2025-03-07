import { useState, useEffect, useCallback } from 'react'
import { Axios, AxiosResponse } from '@/config/http'

export default function useQuery<T>(url: string, lazy = false) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSuccess = async () => {
    setLoading(true)
    try {
      const res: AxiosResponse<T> = await Axios.get<T>(url)
      setData(res.data)
      setError(null) // Clear previous errors if successful
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const runQuery = useCallback(() => {
    handleSuccess()
  }, [url, setData, setError])

  useEffect(() => {
    if (!lazy) runQuery()
  }, [runQuery])

  return { data, loading, error, refetch: runQuery }
}
