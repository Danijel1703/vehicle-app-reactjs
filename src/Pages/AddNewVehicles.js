import { observer } from 'mobx-react-lite'
import { useEffect } from 'react/cjs/react.development'
import API from '../Common/API'
import '../AddNewModel.css'

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
    if ((!makerId || !model || !abrv) && makerId !== 'Select maker...') {
      window.alert('All values must be filled!')
    } else {
      return await API.addNewModel({ makerId, model, abrv })
    }
  }

  const displayMakers = makers.map((maker) => ((
      <option
        onClick={() => { store.setSelectedMaker(maker.id) }}
        key={maker.id}>
        {maker.name}
      </option>
  )))

  return (
    <div className='add-new-form'>
      <select className='select-maker'>
        <option>Select maker...</option>
        {displayMakers}
      </select>
      <div className='text-input'>
        <h2>Name: </h2>
        <input type='text' onInput={e => store.setNewModelName(e.target.value) } />
      </div>
      <div className='text-input'>
        <h2>Abrv: </h2>
        <input type='text' onInput={e => store.setNewModelAbrv(e.target.value) } />
      </div>
      <div className='button-container'>
        <button
          className='insert-button'
          onClick={() => { addNewModel(selectedMaker, newModelName, newModelAbrv) }}>
            Insert
        </button>
      </div>
    </div>
  )
})
export default AddNewVehicles
