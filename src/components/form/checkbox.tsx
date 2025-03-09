import { FormFieldInterface } from '@/interfaces'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { UseFormRegister } from 'react-hook-form'

interface CheckBoxProps {
  field: FormFieldInterface
  register: UseFormRegister<any>
}

function CheckBox({ field, register }: CheckBoxProps) {
  return (
    <div id={field.id} className="my-4">
      <Label className="my-2">{field.label}</Label>
      {field.options?.map((option) => {
        return (
          <div className="flex items-center space-x-2 space-y-2" key={option}>
            <Checkbox id={option} value={option} {...register(field.id)} />
            <label
              htmlFor={option}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default CheckBox
