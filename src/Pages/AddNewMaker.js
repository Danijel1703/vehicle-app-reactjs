import { observer } from 'mobx-react-lite'
import API from '../Common/API'

const AddNewMaker = observer(({ store }) => {
  const newMakerName = store.newMakerName
  const newMakerAbrv = store.newMakerAbrv

  const addNewMaker = async (maker, abrv) => {
    return await API.addNewMaker({ maker, abrv })
  }

  return (
    <div>
      Name:
      <input type='text' onInput={e => store.setNewMakerName(e.target.value) } />
      Abrv:
      <input type='text' onInput={e => store.setNewMakerAbrv(e.target.value) } />
      <button onClick={() => { addNewMaker(newMakerName, newMakerAbrv) }}>Insert</button>
    </div>
  )
})
export default AddNewMaker
