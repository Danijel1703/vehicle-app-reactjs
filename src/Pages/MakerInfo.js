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
  const abrv = store.abrv

  useEffect(async () => {
    store.setSelectedMaker(await API.getMakerById(id))
    const numberOfModels = await API.getNumberOfModels()
    store.setAllModels(await API.getAllModels(numberOfModels))
  }, [])

  const updateSelectedMaker = async (id, name, abrv) => {
    if (!name || !abrv) {
      window.alert('Unsuccessful, all values must be filled.')
    } else {
      return await API.updateSelectedMaker(id, name, abrv)
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
          <div className='text-input'>
            <h1>{selectedMaker.abrv}</h1>
            <h1>New maker name: </h1>
            <input type='text' onInput={e => { store.setAbrv(e.target.value) }} />
          </div>
          <div className='button-container'>
            <button className='insert-button' onClick={() => updateSelectedMaker(id, name, abrv)}>Edit</button>
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
