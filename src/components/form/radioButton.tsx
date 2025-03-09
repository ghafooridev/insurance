import { FormFieldInterface } from '@/interfaces'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { UseFormRegister } from 'react-hook-form'

interface RadioButtonProps {
  field: FormFieldInterface
  register: UseFormRegister<any>
}

function RadioButton({ field, register }: RadioButtonProps) {
  return (
    <div id={field.id} className="my-4">
      <Label className="my-2">{field.label}</Label>
      <RadioGroup
        {...register(field.id)}
        className="flex"
        defaultValue={field.options ? field.options[0] : undefined}
      >
        {field.options?.map((option) => {
          return (
            <div className="flex items-center space-x-2" key={option}>
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="mb-2">
                {option}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default RadioButton
