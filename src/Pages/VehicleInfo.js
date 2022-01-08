import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import API from '../Common/API'

const VehicleInfo = observer(({ VehicleStore }) => {
  const { id } = useParams()
  const [selectedModel, setSelectedModel] = useState({})
  const [name, setName] = useState('test')

  useEffect(async () => {
    setSelectedModel(await API.getModelById(id))
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
            <input type='text' onInput={e => { setName(e.target.value) }} />
            <button onClick={() => updateSelectedModel(id, name)}>Edit</button>
            <button onClick={() => deleteSelectedModel(id)}>Delete</button>
        </div>
  )
})

export default VehicleInfo
