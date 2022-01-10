import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
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
      return await API.updateSelectedModel(id, name, abrv)
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
          <div className='text-input'>
            <h1>{selectedModel.abrv}</h1>
            <h1>New model abrv:</h1>
            <input type='text' onInput={e => { store.setAbrv(e.target.value) }} />
          </div>
          <div className='button-container'>
            <Link to='/vehicles'><button className='insert-button' onClick={() => updateSelectedModel(id, name, abrv)}>Edit</button></Link>
            <Link to='/vehicles'><button className='delete-button' onClick={() => deleteSelectedModel(id)}>Delete</button></Link>
          </div>
        </div>
  )
})

export default ModelInfo
