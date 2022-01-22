import { observer } from 'mobx-react-lite'
import API from '../Common/API'
import '../AddNewMaker.css'

const AddNewMaker = observer(({ store }) => {
  const newMakerName = store.newMakerName
  const newMakerAbrv = store.newMakerAbrv

  const addNewMaker = async (maker, abrv) => {
    if (!maker || !abrv) {
      window.alert('All inputs must be filled!')
    } else {
      await API.addNewMaker({ maker, abrv })
      if (confirm('Maker added successfuly')) {
        window.location.href = '/makers'
      }
    }
  }

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
        <button className='insert-button-add' onClick={() => { addNewMaker(newMakerName, newMakerAbrv) }}>Insert</button>
      </div>
    </div>
  )
})
export default AddNewMaker
