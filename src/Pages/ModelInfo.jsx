import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../Common/API'
import { observer } from 'mobx-react-lite'
import '../EditModel.css'

const ModelInfo = observer(({ store }) => {
  const { id } = useParams()
  const selectedModel = store.selectedModel
  const name = store.name
  const abrv = store.abrv

  useEffect(async () => {
    store.setSelectedModel(await API.getModelById(id))
  }, [])

  const updateSelectedModel = async (id, name, abrv) => {
    if (!name || !abrv) {
      window.alert('Unsuccessful, all values must be filled.')
    } else {
      await API.updateSelectedModel(id, name, abrv)
      if (confirm('Edit successful.')) {
        window.location.href = '/'
      }
    }
  }

  const deleteSelectedModel = async (id) => {
    await API.deleteSelectedModel(id)
    if (confirm('Delete successful.')) {
      window.location.href = '/'
    }
  }

  return (
        <div className='edit-form'>
          <div className='text-input'>
            <h1>{selectedModel.name}</h1>
            <h1>New model name:</h1>
            <input type='text' onInput={e => { store.setName(e.target.value) }} />
          </div>
          <div className='text-input'>
            <h1>{selectedModel.abrv}</h1>
            <h1>New model abrv:</h1>
            <input type='text' onInput={e => { store.setAbrv(e.target.value) }} />
          </div>
          <div className='button-container'>
            <button className='insert-button' onClick={() => updateSelectedModel(id, name, abrv)}>Edit</button>
            <button className='delete-button' onClick={() => deleteSelectedModel(id)}>Delete</button>
          </div>
        </div>
  )
})

export default ModelInfo
