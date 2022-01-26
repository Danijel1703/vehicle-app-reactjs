import { action, autorun, makeObservable, observable } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'
import VehicleModelService from '../Common/VehicleModelService'
import MobxReactForm from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'
import { toast } from 'react-toastify'

class EditMakerStore {
  constructor () {
    this.id = null
    this.selectedMaker = {}
    this.form = null
    makeObservable(this, {
      selectedMaker: observable,
      form: observable,
      id: observable,
      setSelectedMaker: action,
      createNewForm: action,
      setId: action
    })

    autorun(() => {
      this.createNewForm()
    })
  }

  async getSelectedMaker (id) {
    const maker = await VehicleMakeService.getMakerById(id)
    this.setSelectedMaker(maker)
  }

  setSelectedMaker (maker) {
    this.selectedMaker = maker
  }

  setId (id) {
    this.id = id
  }

  createNewForm () {
    const fields = [{
      name: 'name',
      label: 'Name:',
      placeholder: 'Insert new maker name...',
      rules: 'required|string|between: 2,25'
    },
    {
      name: 'id',
      rules: 'required|string'
    }]

    const plugins = {
      dvr: dvr(validatorjs)
    }

    const hooks = {
      async onSuccess (form) {
        const values = form.values()
        const name = values.name
        const abrv = name // temporary
        const id = values.id
        if (name === 'delete') {
          await VehicleMakeService.deleteSelectedMaker(id)
          const numberOfModels = await VehicleModelService.getNumberOfModels()
          const allModels = await VehicleModelService.getAllModels(numberOfModels)
          allModels.forEach(async (model) => {
            if (model.makeId === id) {
              console.log(model.makeId, id)
              await VehicleMakeService.deleteMakerModel(model.id)
            }
          })
          toast.success('Maker deleted successfully')
          form.clear()
          setTimeout(() => {
            window.location.href = '/makers'
          }, 3500)
        } else {
          await VehicleMakeService.updateSelectedMaker(id, name, abrv)
          toast.success('Maker edited successfully')
          form.clear()
        }
      },
      onError (form) {
        console.log(form.values())
        toast.error('Maker edit unsuccessful')
      }
    }

    const form = new MobxReactForm({ fields }, { plugins, hooks })
    this.form = form
  }
}

const Store = new EditMakerStore()
export default Store
