import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import API from '../Common/API'
import '../AddNewModel.css'
import { Link } from 'react-router-dom'

const AddNewModel = observer(({ store }) => {
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
    if (!makerId || !model || !abrv || makerId === 'Select maker...') {
      window.alert('All values must be filled!')
    } else {
      return await API.addNewModel({ makerId, model, abrv })
    }
  }
  const displayMakers = makers.map((maker) => ((
      <option
        value={maker.id}
        key={maker.id}>
        {maker.name}
      </option>
  )))

  return (
    <div className='add-new-form'>
      <select className='select-maker' onChange={e => store.setSelectedMaker(e.target.value)}>
        <option value='Select maker...'>Select maker...</option>
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
        <Link to='/'>
          <button
            className='insert-button-add'
            onClick={() => { addNewModel(selectedMaker, newModelName, newModelAbrv) }}>
              Insert
          </button>
        </Link>
      </div>
    </div>
  )
})
export default AddNewModel
