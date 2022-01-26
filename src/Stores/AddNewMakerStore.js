import { action, autorun, makeObservable, observable } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'
import MobxReactForm from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'
import { toast } from 'react-toastify'

class AddNewMakerStore {
  constructor () {
    this.form = null
    makeObservable(this, {
      form: observable,
      createNewForm: action
    })
    autorun(() => {
      this.createNewForm()
    })
  }

  createNewForm () {
    const fields = [{
      name: 'name',
      label: 'Name:',
      placeholder: 'Insert new maker name...',
      rules: 'required|string|between: 2,25'
    }]

    const plugins = {
      dvr: dvr(validatorjs)
    }

    const hooks = {
      async onSuccess (form) {
        const values = form.values()
        const name = values.name
        const abrv = name // temporary
        const data = { maker: name, abrv: abrv }
        await VehicleMakeService.addNewMaker(data)
        toast.success('Maker added successfully')
        form.clear()
      },
      onError (form) {
        toast.error('Maker add unsuccessful')
      }
    }

    const form = new MobxReactForm({ fields }, { plugins, hooks })
    this.form = form
  }
}

const Store = new AddNewMakerStore()
export default Store
