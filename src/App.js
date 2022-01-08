/* eslint-disable no-unused-vars */
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
import { observer } from 'mobx-react'
import { useEffect } from 'react/cjs/react.development'
import API from './Common/API'

const App = observer(() => {
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
            <Route path='/vehicles' element={<Vehicles VehicleStore={VehicleStore} />} />
            <Route path='/addNew' element={<AddNewVehicles VehicleStore={VehicleStore} />} />
            <Route path='/VehicleInfo/:id' element={<VehicleInfo VehicleStore={VehicleStore} />}/>
        </Routes>
      </Layout>
    </>
  )
})

export default App
