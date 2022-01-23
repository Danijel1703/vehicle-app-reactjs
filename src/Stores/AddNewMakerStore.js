import { action, makeObservable, observable } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'

class AddNewMakerStore {
  constructor () {
    this.newMakerName = null
    this.newMakerAbrv = null
    makeObservable(this, {
      newMakerName: observable,
      newMakerAbrv: observable,
      setNewMakerName: action,
      setNewMakerAbrv: action
    })
  }

  setNewMakerName (name) {
    this.newMakerName = name
  }

  setNewMakerAbrv (abrv) {
    this.newMakerAbrv = abrv
  }

  async addNewMaker (maker, abrv) {
    if (!maker || !abrv) {
      window.alert('All inputs must be filled!')
    } else {
      await VehicleMakeService.addNewMaker({ maker, abrv })
      if (confirm('Maker added successfuly')) {
        window.location.href = '/makers'
      }
    }
  }
}

const Store = new AddNewMakerStore()
export default Store
