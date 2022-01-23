import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import '../AddNewModel.css'

const AddNewModel = observer(({ store }) => {
  const makers = store.allMakers
  const selectedMaker = store.selectedMaker
  const newModelName = store.newModelName
  const newModelAbrv = store.newModelAbrv

  useEffect(() => {
    store.fetchAllMakers()
  }, [])

  return (
    <div className='add-new-form'>
      <select className='select-maker' onChange={e => store.setSelectedMaker(e.target.value)}>
        <option value='Select maker...'>Select maker...</option>
        {
          makers.map((maker) => ((
            <option
              value={maker.id}
              key={maker.id}>
              {maker.name}
            </option>
          )))
        }
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
            className='insert-button-add'
            onClick={() => { store.addNewModel(selectedMaker, newModelName, newModelAbrv) }}>
              Insert
          </button>
      </div>
    </div>
  )
})
export default AddNewModel
