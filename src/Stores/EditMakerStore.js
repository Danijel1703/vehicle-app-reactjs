import { action, makeObservable, observable } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'

class EditMakerStore {
  constructor () {
    this.id = null
    this.selectedMaker = {}
    makeObservable(this, {
      selectedMaker: observable,
      id: observable,
      setSelectedMaker: action,
      setId: action
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
}

const Store = new EditMakerStore()
export default Store
