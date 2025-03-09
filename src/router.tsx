import { Routes, Route } from 'react-router'
import InsuranceForm from './modules/insurance/views/formView'

import InsuranceView from './modules/insurance/views/listView'
import Layout from './layout'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<InsuranceView />} />
        <Route path="form" element={<InsuranceForm />} />
      </Routes>
    </Layout>
  )
}
export default App
