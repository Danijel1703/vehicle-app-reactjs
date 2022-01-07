import './App.css'
import Layout from './Layouts/Layout'
import {
  Routes,
  Route
} from 'react-router-dom'
import Home from './Pages/Home'
import AddNewVehicles from './Pages/AddNewVehicles'
import VehicleStore from './Stores/VehicleStore'
import Vehicles from './Pages/Vehicles'
import VehicleInfo from './Pages/VehicleInfo'

// eslint-disable-next-line react/prop-types
function App () {
  return (
    <>
      <Layout>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/vehicles' element={<Vehicles VehicleStore={VehicleStore} />} />
            <Route path='/addNew' element={<AddNewVehicles />} /> {/* Komponenta u izradi */}
            <Route path='/VehicleInfo/:id' element={<VehicleInfo />}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
