import useQuery from '@/hooks/useQuery'
import { API_URL } from '@/modules/insurance/constants'
import DataTable from './dataTable'

function InsuranceList() {
  const { data, loading } = useQuery<{ data: any; columns: any }>(API_URL.getApplications)
  return <DataTable data={data?.data} columns={data?.columns} loading={loading} />
}

export default InsuranceList
