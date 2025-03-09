import { FormFieldInterface } from '@/interfaces'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { UseFormRegister } from 'react-hook-form'

interface DatePickerProps {
  field: FormFieldInterface
  register: UseFormRegister<any>
}

function DatePicker({ field, register }: DatePickerProps) {
  return (
    <div id={field.id} className="my-4">
      <Label className="my-2">{field.label}</Label>
      <Input type="date" {...register(field.id)} className="w-64" />
    </div>
  )
}

export default DatePicker
