import { Form } from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'
import { toast } from 'react-toastify'
import VehicleMakeService from '../../Common/VehicleMakeService'
import AddNewMakerStore from '../AddNewMakerStore'
import EditMakerStore from '../EditMakerStore'
import VehicleModelService from '../../Common/VehicleModelService'

class MyForm extends Form {
  plugins () {
    return {
      dvr: dvr(validatorjs)
    }
  }

  setup () {
    return {
      fields: [{
        name: 'name',
        label: 'Name:',
        placeholder: 'Insert maker name...',
        rules: 'required|string|between: 2,25'
      }]
    }
  }

  hooks () {
    return {
      async onSuccess (form) {
        const submitType = AddNewMakerStore.submit
        const values = form.values()
        const id = EditMakerStore.id
        const name = values.name
        const abrv = name // temporary
        const data = { maker: name, abrv: abrv }

        if (submitType === 'submit') {
          await VehicleMakeService.addNewMaker(data)
          toast.success('Maker added successfully')
        } else if (submitType === 'delete') {
          await VehicleMakeService.deleteSelectedMaker(id)
          const numberOfModels = await VehicleModelService.getNumberOfModels()
          const allModels = await VehicleModelService.getAllModels(numberOfModels)
          allModels.forEach(async (model) => {
            if (model.makeId === id) {
              await VehicleMakeService.deleteMakerModel(model.id)
            }
          })
          toast.success('Maker deleted successfully')
          form.clear()
          setTimeout(() => {
            window.location.href = '/makers'
          }, 3500)
        } else if (submitType === 'update') {
          await VehicleMakeService.updateSelectedMaker(id, name, abrv)
          toast.success('Maker edited successfully')
          form.clear()
        }
        form.clear()
      },
      onError (form) {
        toast.error('Operation unsuccessful')
      }
    }
  }
}

const form = new MyForm()
export default form
