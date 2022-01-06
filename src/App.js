import './App.css'
import Layout from './Layouts/Layout'
import {
  Routes,
  Route
} from 'react-router-dom'
import Home from './Pages/Home'
import GeneralVehicles from './Pages/GeneralVehicles'
import AddNewVehicles from './Pages/AddNewVehicles'
import VehicleStore from './Stores/VehicleStore'
import AllVehicles from './Pages/AllVehicles'

// eslint-disable-next-line react/prop-types
function App () {
  return (
    <>
      <Layout>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/vehicles' element={<GeneralVehicles VehicleStore={VehicleStore} />} />
            <Route path='/allVehicles' element={<AllVehicles VehicleStore={VehicleStore} />} />
            <Route path='/addNew' element={<AddNewVehicles />} /> {/* Komponenta u izradi */}
        </Routes>
      </Layout>
    </>
  )
}

export default App
