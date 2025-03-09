import { useState, useCallback } from 'react'
import { Axios, AxiosResponse } from '@/config/http'
import { toast } from 'react-toastify'

interface MutationOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
}
export default function useMutation<T, V>(
  url: string,
  method: 'post' | 'put' | 'delete' = 'post',
  options?: MutationOptions<T>
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const mutate = useCallback(
    async (variables: V) => {
      setLoading(true)
      setError(null)

      try {
        const isFormData = variables instanceof FormData
        const headers = isFormData ? { 'Content-Type': 'multipart/form-data' } : {}

        const res: AxiosResponse<T> = await Axios[method]<T>(url, variables, { headers })
        setData(res.data)
        options?.onSuccess?.(res.data)
        toast.success((res.data as any).message)
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setError(errorMessage)
        options?.onError?.(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    },
    [url, method, options]
  )

  return { data, error, loading, mutate }
}
