import { useState, useCallback } from 'react'
import { Axios, AxiosResponse } from '@/config/http'

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
        const res: AxiosResponse<T> = await Axios[method]<T>(url, variables)
        setData(res.data)
        options?.onSuccess?.(res.data)
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setError(errorMessage)
        options?.onError?.(errorMessage)
      } finally {
        setLoading(false)
      }
    },
    [url, method, options]
  )

  return { data, error, loading, mutate }
}

/* example
const { mutate, loading, error, data } = useMutation<User, UserPayload>(
  '/users',
  'post',
  {
    onSuccess: (data) => console.log('User created:', data),
    onError: (error) => console.error('Mutation failed:', error),
  }
)

// Call mutate with data when needed
const handleSubmit = () => {
  mutate({ name: 'Ali', email: 'ali@example.com' })
}
  */
