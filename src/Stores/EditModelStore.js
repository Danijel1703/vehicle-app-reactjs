import { action, autorun, makeObservable, observable } from 'mobx'
import VehicleModelService from '../Common/VehicleModelService'
import MobxReactForm from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'
import { toast } from 'react-toastify'

class EditModelStore {
  constructor () {
    this.id = null
    this.selectedModel = {}
    this.form = null
    makeObservable(this, {
      selectedModel: observable,
      form: observable,
      id: observable,
      setSelectedModel: action,
      createNewForm: action,
      setId: action
    })

    autorun(() => {
      this.createNewForm()
    })
  }

  async getSelectedModel (id) {
    const model = await VehicleModelService.getModelById(id)
    this.setSelectedModel(model)
  }

  setSelectedModel (model) {
    this.selectedModel = model
  }

  setId (id) {
    this.id = id
  }

  createNewForm () {
    const fields = [{
      name: 'name',
      label: 'Name:',
      placeholder: 'Insert new model name...',
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
          await VehicleModelService.deleteSelectedModel(id)
          toast.success('Model deleted successfully')
          form.clear()
          setTimeout(() => {
            window.location.href = '/'
          }, 3500)
        } else {
          await VehicleModelService.updateSelectedModel(id, name, abrv)
          toast.success('Model edited successfully')
          form.clear()
        }
      },
      onError (form) {
        toast.error('Model edit unsuccessful')
      }
    }

    const form = new MobxReactForm({ fields }, { plugins, hooks })
    this.form = form
  }
}

const Store = new EditModelStore()
export default Store
