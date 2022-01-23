import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import '../EditModel.css'

const ModelInfo = observer(({ store }) => {
  const { id } = useParams()
  const selectedModel = store.selectedModel
  const name = store.editName
  const abrv = store.editAbrv

  useEffect(async () => {
    store.getSelectedModel(id)
  }, [])

  return (
        <div className='edit-form'>
          <div className='text-input'>
            <h1>{selectedModel.name}</h1>
            <h1>Edit model name:</h1>
            <input type='text' onInput={e => { store.setEditName(e.target.value) }} />
          </div>
          <div className='text-input'>
            <h1>{selectedModel.abrv}</h1>
            <h1>Edit model abrv:</h1>
            <input type='text' onInput={e => { store.setEditAbrv(e.target.value) }} />
          </div>
          <div className='button-container'>
            <button className='insert-button' onClick={() => store.updateSelectedModel(id, name, abrv)}>Edit</button>
            <button className='delete-button' onClick={() => store.deleteSelectedModel(id)}>Delete</button>
          </div>
        </div>
  )
})

export default ModelInfo
