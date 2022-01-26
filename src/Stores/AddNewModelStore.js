import { action, autorun, makeObservable, observable } from 'mobx'
import VehicleModelService from '../Common/VehicleModelService'
import VehicleMakeService from '../Common/VehicleMakeService'
import MobxReactForm from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'
import { toast } from 'react-toastify'

class AddNewModelStore {
  constructor () {
    this.allMakers = []
    this.form = null
    makeObservable(this, {
      allMakers: observable,
      form: observable,
      setAllMakers: action,
      createNewForm: action
    })
    autorun(() => {
      this.createNewForm()
      this.fetchAllMakers()
    })
  }

  async fetchAllMakers () {
    const numberOfMakers = await VehicleMakeService.getNumberOfMakers()
    const allMakers = await VehicleMakeService.getAllMakers(numberOfMakers)
    this.setAllMakers(allMakers)
  }

  setAllMakers (makers) {
    this.allMakers = makers
  }

  createNewForm () {
    const fields = [{
      name: 'maker',
      label: 'Maker',
      rules: 'required|string'
    }, {
      name: 'name',
      label: 'Name',
      placeholder: 'Insert new model name...',
      rules: 'required|string|between: 2,25'
    }]

    const plugins = {
      dvr: dvr(validatorjs)
    }

    const hooks = {
      async onSuccess (form) {
        const values = form.values()
        const maker = values.maker
        const model = values.name
        const abrv = model // temporary
        const data = { makerId: maker, model: model, abrv: abrv }
        await VehicleModelService.addNewModel(data)
        toast.success('Model added successfully')
        form.clear()
      },
      onError (form) {
        toast.error('Model add unsuccessful')
      }
    }

    const form = new MobxReactForm({ fields }, { plugins, hooks })
    this.form = form
  }
}

const Store = new AddNewModelStore()
export default Store
