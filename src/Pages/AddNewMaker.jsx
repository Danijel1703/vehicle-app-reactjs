import { observer } from 'mobx-react-lite'
import '../AddNewMaker.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddNewMaker = observer(({ store, form }) => {
  return (
    <div>
      <ToastContainer
      position="top-center"
      autoClose={3500}
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
          <label className='form-label' htmlFor={form?.$('name').id}>
            {form?.$('name').label}
          </label>
          <input className='form-input' {...form?.$('name').bind()} />
          <p className='form-p-error'>{form?.$('name').error}</p>
        </div>
        <div className='button-container'>
          <button type="submit" onClick={(event) => { form?.onSubmit(event); store.setSubmit('submit') }} className='insert-button-add'>Submit</button>
          <button type="button" onClick={form?.onClear} className='clear-button'>Clear</button>
          <p>{form?.error}</p>
        </div>
      </form>
    </div>
  )
})
export default AddNewMaker
