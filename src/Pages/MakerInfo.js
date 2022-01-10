import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../Common/API'
import { observer } from 'mobx-react-lite'
import '../EditMaker.css'

const MakerInfo = observer(({ store }) => {
  const { id } = useParams()
  const selectedMaker = store.selectedMaker
  const allModels = store.allModels
  const name = store.name

  useEffect(async () => {
    store.setSelectedMaker(await API.getMakerById(id))
    const numberOfModels = await API.getNumberOfModels()
    store.setAllModels(await API.getAllVehicles(numberOfModels))
  }, [])

  const updateSelectedMaker = async (id, name) => {
    if (!name) {
      window.alert('You must insert a name.')
    } else {
      return await API.updateSelectedMaker(id, name)
    }
  }

  const deleteSelectedMaker = async (id) => {
    return await API.deleteSelectedMaker(id)
  }

  const deleteMakerModels = async (id) => {
    allModels.forEach(async (model) => {
      if (model.makeId === id) {
        await API.deleteMakerModel(model.id)
      }
    })
  }

  return (
        <div className='edit-form'>
          <div className='text-input'>
            <h1>{selectedMaker.name}</h1>
            <h1>New maker name: </h1>
            <input type='text' onInput={e => { store.setName(e.target.value) }} />
          </div>
          <div className='button-container'>
            <button className='insert-button' onClick={() => updateSelectedMaker(id, name)}>Edit</button>
            <button
            className='delete-button'
            onClick={() => {
              deleteSelectedMaker(id)
              deleteMakerModels(id)
            }}>Delete</button>
          </div>
        </div>
  )
})

export default MakerInfo
