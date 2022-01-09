/* eslint-disable no-unused-vars */
import './App.css'
import Layout from './Layouts/Layout'
import {
  Routes,
  Route
} from 'react-router-dom'
import Home from './Pages/Home'
import AddNewVehicles from './Pages/AddNewVehicles'
import Vehicles from './Pages/Vehicles'
import VehicleInfo from './Pages/VehicleInfo'
import { useEffect } from 'react/cjs/react.development'
import API from './Common/API'
import VehicleStore from './Stores/VehicleStore'

const App = () => {
  useEffect(async () => {
    const numberOfModels = await API.getNumberOfModels()
    const allModels = await API.getAllVehicles(numberOfModels)
    const numberOfMakers = await API.getNumberOfMakers()
    const allMakers = await API.getAllMakers(numberOfMakers)
  })
  return (
    <>
      <Layout>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/vehicles' element={<Vehicles store = {VehicleStore} />} />
            <Route path='/addNew' element={<AddNewVehicles store = {VehicleStore} />} />
            <Route path='/VehicleInfo/:id' element={<VehicleInfo store = {VehicleStore} />}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
