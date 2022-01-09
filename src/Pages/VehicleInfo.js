import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../Common/API'
import { observer } from 'mobx-react-lite'

const VehicleInfo = observer(({ store }) => {
  const { id } = useParams()
  const selectedModel = store.selectedModel
  const name = store.name

  useEffect(async () => {
    store.setSelectedModel(await API.getModelById(id))
  }, [])

  const updateSelectedModel = async (id, name) => {
    return await API.updateSelectedModel(id, name)
  }

  const deleteSelectedModel = async (id) => {
    return await API.deleteSelectedModel(id)
  }

  return (
        <div>
            <h1>{selectedModel.name}</h1>
            <input type='text' onInput={e => { store.setName(e.target.value) }} />
            <button onClick={() => updateSelectedModel(id, name)}>Edit</button>
            <button onClick={() => deleteSelectedModel(id)}>Delete</button>
        </div>
  )
})

export default VehicleInfo
