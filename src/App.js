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
import EditModelStore from './Stores/EditModelStore'
import EditMakerStore from './Stores/EditMakerStore'
import AddNewMakerStore from './Stores/AddNewMakerStore'
import AddNewModelStore from './Stores/AddNewModelStore'
import MakerForm from './Stores/Forms/MakerForm'
import ModelForm from './Stores/Forms/ModelForm'

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
            <Route path='/' element={ <Models store = {ModelStore} /> } />
            <Route path='/vehicles' element={<Models store = {ModelStore} />} />
            <Route path='/makers' element={<Makers store = {MakerStore} />} />
            <Route path='/addNewModel' element={<AddNewModel store = {AddNewModelStore} form = {ModelForm} />} />
            <Route path='/addNewMaker' element= { <AddNewMaker store = {AddNewMakerStore} form = {MakerForm} /> } />
            <Route path='/vehicleInfo/:id' element={<ModelInfo store = {EditModelStore} form = {ModelForm} />}/>
            <Route path='/makerInfo/:id' element={<MakerInfo store = {EditMakerStore} form = {MakerForm} />}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
