import { action, makeObservable, observable } from 'mobx'
import VehicleModelService from '../Common/VehicleModelService'
import VehicleMakeService from '../Common/VehicleMakeService'

class AddNewModelStore {
  constructor () {
    this.selectedMaker = []
    this.newModelName = null
    this.newModelAbrv = null
    this.allMakers = []
    makeObservable(this, {
      newModelName: observable,
      newModelAbrv: observable,
      allMakers: observable,
      setSelectedMaker: action,
      setNewModelName: action,
      setNewModelAbrv: action,
      setAllMakers: action
    })
  }

  async fetchAllMakers () {
    const numberOfMakers = await VehicleMakeService.getNumberOfMakers()
    const allMakers = await VehicleMakeService.getAllMakers(numberOfMakers)
    this.setAllMakers(allMakers)
  }

  setSelectedMaker (id) {
    this.selectedMaker = id
  }

  setNewModelName (name) {
    this.newModelName = name
  }

  setNewModelAbrv (abrv) {
    this.newModelAbrv = abrv
  }

  setAllMakers (makers) {
    this.allMakers = makers
  }

  async addNewModel (makerId, model, abrv) {
    if (!makerId || !model || !abrv || makerId === 'Select maker...') {
      window.alert('All values must be filled!')
    } else {
      await VehicleModelService.addNewModel({ makerId, model, abrv })
      if (confirm('Model added successfuly')) {
        window.location.href = '/'
      }
    }
  }
}

const Store = new AddNewModelStore()
export default Store
