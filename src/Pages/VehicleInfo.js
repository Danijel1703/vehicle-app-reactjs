import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'

// eslint-disable-next-line react/prop-types
const VehicleInfo = observer(({ VehicleStore }) => {
  const { id } = useParams()
  const [selectedModel, setSelectedModel] = useState({})
  const [name, setName] = useState('test')

  useEffect(async () => {
    await VehicleStore.fetchModelById(id)
    setSelectedModel(VehicleStore.selectedModel)
  }, [])

  return (
        <div>
            <h1>{selectedModel.name}</h1>
            <input type='text' onInput={e => { setName(e.target.value) }} />
            <button onClick={() => VehicleStore.updateSelectedModel(id, name)}>Edit</button>
            <button onClick={() => VehicleStore.deleteSelectedModel(id)}>Delete</button>
        </div>
  )
})

export default VehicleInfo
