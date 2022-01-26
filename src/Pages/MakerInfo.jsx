import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ToastContainer } from 'react-toastify'
import '../EditMaker.css'

const MakerInfo = observer(({ store }) => {
  const { id } = useParams()
  const selectedMaker = store.selectedMaker
  const form = store.form
  form.$('id').set(id)

  useEffect(() => {
    store.getSelectedMaker(id)
    store.setId(id)
  }, [])

  return (
    <div>
      <ToastContainer
      position="top-center"
      autoClose={2500}
      theme='colored'
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      icon={true} />
      <form className='add-new-form'>
        <div className='text-input'>
          Current name: {selectedMaker.name}
          <label className='form-label' htmlFor={form.$('name').id}>
            {form.$('name').label}
          </label>
          <input className='form-input' {...form.$('name').bind()} />
          <p className='form-p-error'>{form.$('name').error}</p>
        </div>
        <div className='button-container'>
          <button type="submit" onClick={async (event) => {
            form.onSubmit(event)
            setTimeout(() => { store.getSelectedMaker(id) }, 0)
          }}
            className='insert-button-add'>Submit</button>
          <button type="button" onClick={(event) => {
            form.$('name').set('delete')
            form.onSubmit(event)
          }} className='clear-button'>Delete</button>
          <p>{form.error}</p>
        </div>
      </form>
    </div>
  )
})

export default MakerInfo
