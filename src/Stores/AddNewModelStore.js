import { action, autorun, makeObservable, observable } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'
import MyForm from './Forms/ModelForm'

class AddNewModelStore {
  constructor () {
    this.allMakers = []
    this.form = null
    this.submit = null
    makeObservable(this, {
      allMakers: observable,
      form: observable,
      submit: observable,
      setAllMakers: action,
      createNewForm: action,
      setSubmit: action
    })
    autorun(() => {
      this.fetchAllMakers()
    })
  }

  async fetchAllMakers () {
    const numberOfMakers = await VehicleMakeService.getNumberOfMakers()
    const allMakers = await VehicleMakeService.getAllMakers(numberOfMakers)
    this.setAllMakers(allMakers)
  }

  setSubmit (type) {
    this.submit = type
  }

  setAllMakers (makers) {
    this.allMakers = makers
  }

  createNewForm () {
    this.form = MyForm
  }
}

const Store = new AddNewModelStore()
export default Store
