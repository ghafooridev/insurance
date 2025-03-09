import useQuery from '@/hooks/useQuery'
import { API_URL } from '../constants'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InsuranceFormInterface } from '@/interfaces'
import InsuranceForm from '../components/form'
import { getShortTitle } from '@/lib/utils'
import { useEffect, useState } from 'react'

function FormView() {
  const formStructure = useQuery<InsuranceFormInterface[]>(API_URL.getForms)
  const [defaultTab, setDefaultTab] = useState('health_insurance_application')

  useEffect(() => {
    if (formStructure.data) setDefaultTab(formStructure.data[0].formId)
  }, [formStructure])

  if (formStructure.loading) return <div>Loading...</div>

  return (
    <div>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {formStructure.data?.map((form: InsuranceFormInterface) => {
            return (
              <TabsTrigger key={form.formId} value={form.formId}>
                {getShortTitle(form.title)}
              </TabsTrigger>
            )
          })}
        </TabsList>
        {formStructure.data?.map((form: InsuranceFormInterface) => {
          return (
            <TabsContent key={form.formId} value={form.formId}>
              <InsuranceForm form={form} />
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

export default FormView
