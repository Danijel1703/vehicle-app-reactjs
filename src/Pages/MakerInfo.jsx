import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import '../EditMaker.css'

const MakerInfo = observer(({ store }) => {
  const { id } = useParams()
  const selectedMaker = store.selectedMaker
  const name = store.editName
  const abrv = store.editAbrv

  useEffect(async () => {
    store.getSelectedMaker(id)
  }, [])

  return (
        <div className='edit-form'>
          <div className='text-input'>
            <h1>{selectedMaker.name}</h1>
            <h1>Edit maker name:</h1>
            <input type='text' onInput={e => { store.setEditName(e.target.value) }} />
          </div>
          <div className='text-input'>
            <h1>{selectedMaker.abrv}</h1>
            <h1>Edit maker abrv:</h1>
            <input type='text' onInput={e => { store.setEditAbrv(e.target.value) }} />
          </div>
          <div className='button-container'>
            <button className='insert-button' onClick={() => store.updateSelectedMaker(id, name, abrv)}>Edit</button>
            <button className='delete-button' onClick={() => store.deleteSelectedMaker(id)}>Delete</button>
          </div>
        </div>
  )
})

export default MakerInfo
