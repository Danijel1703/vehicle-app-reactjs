import { observer } from 'mobx-react-lite'
import '../AddNewMaker.css'

const AddNewMaker = observer(({ store }) => {
  const newMakerName = store.newMakerName
  const newMakerAbrv = store.newMakerAbrv

  return (
    <div className='add-new-form'>
      <div className='text-input'>
        <h2>Name</h2>
        <input type='text' onInput={e => store.setNewMakerName(e.target.value) } />
      </div>
      <div className='text-input'>
        <h2>Abrv</h2>
        <input type='text' onInput={e => store.setNewMakerAbrv(e.target.value) } />
      </div>
      <div className='button-container'>
        <button className='insert-button-add' onClick={() => { store.addNewMaker(newMakerName, newMakerAbrv) }}>Insert</button>
      </div>
    </div>
  )
})
export default AddNewMaker
