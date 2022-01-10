import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../Common/API'
import { observer } from 'mobx-react-lite'
import '../EditModel.css'

const VehicleInfo = observer(({ store }) => {
  const { id } = useParams()
  const selectedModel = store.selectedModel
  const name = store.name

  useEffect(async () => {
    store.setSelectedModel(await API.getModelById(id))
  }, [])

  const updateSelectedModel = async (id, name) => {
    if (!name) {
      window.alert('You must insert a name.')
    } else {
      return await API.updateSelectedModel(id, name)
    }
  }

  const deleteSelectedModel = async (id) => {
    return await API.deleteSelectedModel(id)
  }

  return (
        <div className='edit-form'>
          <div className='text-input'>
            <h1>{selectedModel.name}</h1>
            <h1>New model name:</h1>
            <input type='text' onInput={e => { store.setName(e.target.value) }} />
          </div>
          <div className='button-container'>
            <button className='insert-button' onClick={() => updateSelectedModel(id, name)}>Edit</button>
            <button className='delete-button' onClick={() => deleteSelectedModel(id)}>Delete</button>
          </div>
        </div>
  )
})

export default VehicleInfo
