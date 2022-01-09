import { observer } from 'mobx-react-lite'
import { useEffect } from 'react/cjs/react.development'
import API from '../Common/API'

const AddNewVehicles = observer(({ store }) => {
  const makers = store.allMakers
  const selectedMaker = store.selectedMaker
  const newModelName = store.newModelName
  const newModelAbrv = store.newModelAbrv

  useEffect(() => {
    fetchAllMakers()
  }, [])

  const fetchAllMakers = async () => {
    const numberOfMakers = await API.getNumberOfMakers()
    store.setAllMakers(await API.getAllMakers(numberOfMakers))
  }
  const addNewModel = async (makerId, model, abrv) => {
    return await API.addNewModel({ makerId, model, abrv })
  }

  const displayMakers = makers.map((maker) => ((
      <div key={maker.id}>
          <button onClick={() => { store.setSelectedMaker(maker.id) }}>{maker.name}</button>
      </div>
  )))

  return (
    <div>
      {displayMakers}
      Name:
      <input type='text' onInput={e => store.setNewModelName(e.target.value) } />
      <br/>
      Abrv:
      <input type='text' onInput={e => store.setNewModelAbrv(e.target.value) } />
      <button onClick={() => { addNewModel(selectedMaker, newModelName, newModelAbrv) }}>Insert</button>
    </div>
  )
})
export default AddNewVehicles
