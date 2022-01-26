import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ToastContainer } from 'react-toastify'
import '../EditModel.css'

const ModelInfo = observer(({ store }) => {
  const { id } = useParams()
  const selectedModel = store.selectedModel
  const form = store.form
  form.$('id').set(id)

  useEffect(() => {
    store.getSelectedModel(id)
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
          Current name: {selectedModel.name}
          <label className='form-label' htmlFor={form.$('name').id}>
            {form.$('name').label}
          </label>
          <input className='form-input' {...form.$('name').bind()} />
          <p className='form-p-error'>{form.$('name').error}</p>
        </div>
        <div className='button-container'>
          <button type="submit" onClick={async (event) => { form.onSubmit(event); setTimeout(() => { store.getSelectedModel(id) }, 0) }} className='insert-button-add'>Submit</button>
{ // eslint-disable-next-line no-unused-expressions
}          <button type="button" onClick={(event) => { form.$('name').set('delete'); form.onSubmit(event) }} className='clear-button'>Delete</button>
          <p>{form.error}</p>
        </div>
      </form>
    </div>
  )
})

export default ModelInfo
