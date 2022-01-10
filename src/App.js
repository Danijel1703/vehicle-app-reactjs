/* eslint-disable no-unused-vars */
import './App.css'
import Layout from './Layouts/Layout'
import {
  Routes,
  Route
} from 'react-router-dom'
import AddNewModel from './Pages/AddNewModel'
import ModelStore from './Stores/ModelStore'
import MakerStore from './Stores/MakerStore'
import AddNewMaker from './Pages/AddNewMaker'
import Makers from './Pages/Makers'
import MakerInfo from './Pages/MakerInfo'
import ModelInfo from './Pages/ModelInfo'
import Models from './Pages/Models'

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
            <Route path='/' element={ <Models store = {ModelStore} /> } />
            <Route path='/vehicles' element={<Models store = {ModelStore} />} />
            <Route path='/makers' element={<Makers store = {MakerStore} />} />
            <Route path='/addNewModel' element={<AddNewModel store = {ModelStore} />} />
            <Route path='/addNewMaker' element= { <AddNewMaker store = {MakerStore} /> } />
            <Route path='/vehicleInfo/:id' element={<ModelInfo store = {ModelStore} />}/>
            <Route path='/makerInfo/:id' element={<MakerInfo store = {MakerStore} />}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
