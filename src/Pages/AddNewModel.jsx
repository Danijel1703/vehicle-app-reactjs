import { observer } from 'mobx-react-lite'
import { ToastContainer } from 'react-toastify'
import '../AddNewModel.css'

const AddNewModel = observer(({ store }) => {
  const makers = store.allMakers
  const form = store.form

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
          Select maker:
          <select className='select-maker' {...form.$('maker').bind()}>
            <option value=''>..</option>
            {
              makers.map((maker) => ((
                <option
                  value={maker.id}
                  key={maker.id}
                  >
                  {maker.name}
                </option>
              )))
            }
          </select>
          <p className='form-p-error'>{form.$('maker').error}</p>
          </div>
        <div className='text-input'>
          <label className='form-label' htmlFor={form.$('name').id}>
            {form.$('name').label}
          </label>
          <input className='form-input' {...form.$('name').bind()} />
          <p className='form-p-error'>{form.$('name').error}</p>
        </div>
        <div className='button-container'>
          <button type="submit" onClick={form.onSubmit} className='insert-button-add'>Submit</button>
          <button type="button" onClick={form.onClear} className='clear-button'>Clear</button>
          <p>{form.error}</p>
        </div>
      </form>
    </div>
  )
})
export default AddNewModel
