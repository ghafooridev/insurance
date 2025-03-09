export interface FormFieldInterface {
  id: string
  label: string
  type: 'text' | 'number' | 'date' | 'select' | 'radio' | 'checkbox' | 'group'
  required?: boolean
  options?: string[]
  fields?: FormFieldInterface[]
  dynamicOptions?: {
    dependsOn: string
    endpoint: string
    method: string
  }
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
  visibility?: {
    dependsOn: string
    condition: 'equals'
    value: string
  }
}

export interface InsuranceFormInterface {
  formId: string
  title: string
  fields: FormFieldInterface[]
}
