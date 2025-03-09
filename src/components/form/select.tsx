import { FormFieldInterface } from '@/interfaces'
import useQuery from '@/hooks/useQuery'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { getDependsValue } from '@/lib/utils'
import { UseFormRegister } from 'react-hook-form'

interface FormSelectProps {
  field: FormFieldInterface
  register: UseFormRegister<any>
}

function FormSelect({ field, register }: FormSelectProps) {
  const dependOn = field.dynamicOptions?.dependsOn

  const [url, setUrl] = useState('')
  const [options, setOptions] = useState<string[]>([])

  const dynamicOption = useQuery<{ country: string; states: string[] }>(url, true)

  useEffect(() => {
    if (field.dynamicOptions && dependOn) {
      const dependOnValue = getDependsValue(dependOn)
      setUrl(`${field.dynamicOptions.endpoint}?${dependOn}=${dependOnValue}`)
    }
  }, [dependOn])

  useEffect(() => {
    if (dynamicOption.data) {
      setOptions(dynamicOption.data.states)
    } else {
      setOptions(field.options!)
    }
  }, [dynamicOption.data, url])

  const handleOpen = () => {
    if (field.dynamicOptions && dependOn) {
      const dependOnValue = getDependsValue(dependOn)
      setUrl(`${field.dynamicOptions.endpoint}?${dependOn}=${dependOnValue}`)
      dynamicOption.refetch()
    }
  }

  const { visibility } = field
  const { dependsOn, condition, value } = visibility || {}

  return (
    <div
      className="my-4"
      data-visibility-id={dependsOn}
      data-visibility-condition={condition}
      data-visibility-value={value}
    >
      <Label className="my-2">{field.label}</Label>
      <Select onOpenChange={() => handleOpen()} {...register(field.id)}>
        <SelectTrigger className="w-64" id={field.id}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent id={field.id}>
          <SelectGroup>
            {options?.length > 0 ? (
              options?.map((option) => (
                <SelectItem value={option} key={option}>
                  {option}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-gray-500 text-center">
                {dynamicOption.loading ? 'Loading...' : 'No options available'}
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default FormSelect
