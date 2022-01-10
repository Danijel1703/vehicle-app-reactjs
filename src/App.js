/* eslint-disable no-unused-vars */
import './App.css'
import Layout from './Layouts/Layout'
import {
  Routes,
  Route
} from 'react-router-dom'
import AddNewVehicles from './Pages/AddNewVehicles'
import Vehicles from './Pages/Vehicles'
import VehicleInfo from './Pages/VehicleInfo'
import { useEffect } from 'react/cjs/react.development'
import API from './Common/API'
import VehicleStore from './Stores/VehicleStore'
import MakerStore from './Stores/MakerStore'
import AddNewMaker from './Pages/AddNewMaker'
import Makers from './Pages/Makers'
import MakerInfo from './Pages/MakerInfo'

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
            <Route path='/' element={ <Vehicles store = {VehicleStore} /> } />
            <Route path='/vehicles' element={<Vehicles store = {VehicleStore} />} />
            <Route path='/makers' element={<Makers store = {MakerStore} />} />
            <Route path='/addNewModel' element={<AddNewVehicles store = {VehicleStore} />} />
            <Route path='/addNewMaker' element= { <AddNewMaker store = {MakerStore} /> } />
            <Route path='/vehicleInfo/:id' element={<VehicleInfo store = {VehicleStore} />}/>
            <Route path='/makerInfo/:id' element={<MakerInfo store = {MakerStore} />}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
