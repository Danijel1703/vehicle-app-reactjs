import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../Common/API'
import { observer } from 'mobx-react-lite'

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
    return await API.updateSelectedMaker(id, name)
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
        <div>
            <h1>{selectedMaker.name}</h1>
            <input type='text' onInput={e => { store.setName(e.target.value) }} />
            <button onClick={() => updateSelectedMaker(id, name)}>Edit</button>
            <button onClick={() => {
              deleteSelectedMaker(id)
              deleteMakerModels(id)
            }}>Delete</button>
        </div>
  )
})

export default MakerInfo
