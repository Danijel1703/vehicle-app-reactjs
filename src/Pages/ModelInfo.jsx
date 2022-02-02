import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ToastContainer } from 'react-toastify'
import '../EditModel.css'
import AddNewModelStore from '../Stores/AddNewModelStore'

const ModelInfo = observer(({ store, form }) => {
  const { id } = useParams()
  const selectedModel = store.selectedModel
  useEffect(() => {
    store.getSelectedModel(id)
    store.setId(id)
    form?.$('maker').set(store.selectedModel.makerId)
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
          <label className='form-label' htmlFor={form?.$('name').id}>
            {form?.$('name').label}
          </label>
          <input className='form-input' {...form?.$('name').bind()} />
          <p className='form-p-error'>{form?.$('name').error}</p>
        </div>
        <div className='button-container'>
          <button type="submit" onClick={async (event) => { form?.onSubmit(event); AddNewModelStore.setSubmit('update'); setTimeout(() => { store.getSelectedModel(id) }, 5) }} className='insert-button-add'>Submit</button>
          <button type="button" onClick={(event) => { form?.$('name').set('delete'); form?.onSubmit(event); AddNewModelStore.setSubmit('delete') }} className='clear-button'>Delete</button>
          <p>{form?.error}</p>
        </div>
      </form>
    </div>
  )
})

export default ModelInfo
