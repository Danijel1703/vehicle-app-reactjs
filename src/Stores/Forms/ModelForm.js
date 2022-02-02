import { Form } from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'
import { toast } from 'react-toastify'
import VehicleModelService from '../../Common/VehicleModelService'
import EditModelStore from '../EditModelStore'
import AddNewModelStore from '../AddNewModelStore'

class MyForm extends Form {
  plugins () {
    return {
      dvr: dvr(validatorjs)
    }
  }

  setup () {
    return {
      fields: [{
        name: 'maker',
        label: 'Maker',
        rules: 'required|string'
      }, {
        name: 'name',
        label: 'Name',
        placeholder: 'Insert new model name...',
        rules: 'required|string|between: 2,25'
      }]
    }
  }

  hooks () {
    return {
      async onSuccess (form) {
        const submitType = AddNewModelStore.submit
        const values = form.values()
        const maker = values.maker
        const model = values.name
        const id = EditModelStore.id
        const abrv = model // temporary
        const data = { makerId: maker, model: model, abrv: abrv }
        if (submitType === 'submit') {
          await VehicleModelService.addNewModel(data)
          toast.success('Model added successfully')
          form.clear()
        } else if (submitType === 'delete') {
          await VehicleModelService.deleteSelectedModel(id)
          toast.success('Model deleted successfully')
          form.clear()
          setTimeout(() => {
            window.location.href = '/'
          }, 3500)
        } else if (submitType === 'update') {
          await VehicleModelService.updateSelectedModel(id, model, abrv)
          toast.success('Model edited successfully')
          form.clear()
        }
      },
      onError (form) {
        toast.error('Operation unsuccessful')
      }
    }
  }
}

const form = new MyForm()
export default form
