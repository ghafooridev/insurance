import { useForm } from 'react-hook-form'
import useMutation from '@/hooks/useMutation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { FormFieldInterface, InsuranceFormInterface } from '@/interfaces'
import { getShortTitle } from '@/lib/utils'
import DatePicker from '@/components/form/datePicker'
import FormSelect from '@/components/form/select'
import TextInput from '@/components/form/textInput'
import CheckBox from '@/components/form/checkbox'
import RadioButton from '@/components/form/radioButton'
import { API_URL } from '../constants'
import { useEffect, useRef } from 'react'

function InsuranceForm({ form }: { form: InsuranceFormInterface }) {
  const { register, handleSubmit, watch } = useForm()
  const { mutate, loading } = useMutation(API_URL.submitForm, 'post')

  const formValues = watch()
  const prevFormValues = useRef(formValues)

  const flattenFormValues = (values: any, prefix = ''): any => {
    const flattened: any = {}
    for (const key in values) {
      const value = values[key]
      const newKey = prefix ? `${prefix}.${key}` : key

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, flattenFormValues(value, newKey))
      } else {
        flattened[newKey] = value
      }
    }
    return flattened
  }

  const handleVisibility = (changedFields: { [key: string]: any }) => {
    const trackField: Element | null = document.querySelector(
      `[data-visibility-id=${Object.keys(changedFields)[0]}]`
    )
    if (trackField) {
      const visibilityValue = Object.values(changedFields)[0]
      const visibilityField = document.querySelector(`[data-visibility-value="${visibilityValue}"]`)
      if (visibilityField) {
        trackField.classList.remove('hidden')
      } else {
        trackField.classList.add('hidden')
      }
    }
  }

  useEffect(() => {
    const currentFlattenedValues = flattenFormValues(formValues)
    const prevFlattenedValues = flattenFormValues(prevFormValues.current)

    const changedFields: { [key: string]: any } = {}
    Object.keys(currentFlattenedValues).forEach((key) => {
      if (currentFlattenedValues[key] !== prevFlattenedValues[key]) {
        changedFields[key] = currentFlattenedValues[key]
      }
    })

    if (Object.keys(changedFields).length > 0) {
      handleVisibility(changedFields)
    }

    prevFormValues.current = formValues
  }, [formValues])

  const onSubmit = (data: any) => {
    mutate(data)
  }

  const renderField = (field: FormFieldInterface) => {
    switch (field.type) {
      case 'text':
      case 'number':
        return <TextInput register={register} field={field} />
      case 'checkbox':
        return <CheckBox register={register} field={field} />
      case 'radio':
        return <RadioButton register={register} field={field} />
      case 'select':
        return <FormSelect register={register} field={field} />
      case 'date':
        return <DatePicker register={register} field={field} />
      case 'group':
        return (
          <div id={field.id}>
            {field.fields?.map((subField) => <div key={subField.id}>{renderField(subField)}</div>)}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>{getShortTitle(form.title)}</CardTitle>
          <CardDescription>{form.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {form.fields?.map((field) => renderField(field))}
        </CardContent>
        <CardFooter>
          <Button type="submit">{loading ? 'Submitting...' : 'Submit Application'}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default InsuranceForm
