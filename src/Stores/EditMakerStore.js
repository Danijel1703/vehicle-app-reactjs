import { action, makeObservable, observable } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'

class EditMakerStore {
  constructor () {
    this.editName = ''
    this.editAbrv = ''
    this.selectedMaker = {}
    makeObservable(this, {
      editName: observable,
      editAbrv: observable,
      selectedMaker: observable,
      setEditName: action,
      setEditAbrv: action,
      setSelectedMaker: action
    })
  }

  setEditName (name) {
    this.editName = name
  }

  setEditAbrv (abrv) {
    this.editAbrv = abrv
  }

  async getSelectedMaker (id) {
    const maker = await VehicleMakeService.getMakerById(id)
    this.setSelectedMaker(maker)
  }

  setSelectedMaker (maker) {
    this.selectedMaker = maker
  }

  async updateSelectedMaker (id, name, abrv) {
    if (!name || !abrv) {
      window.alert('Unsuccessful, all values must be filled.')
    } else {
      await VehicleMakeService.updateSelectedMaker(id, name, abrv)
      if (confirm('Edit successful.')) {
        window.location.href = '/makers'
      }
    }
  }

  async deleteSelectedMaker (id) {
    await VehicleMakeService.deleteSelectedMaker(id)
    if (confirm('Delete successful.')) {
      window.location.href = '/makers'
    }
  }
}

const Store = new EditMakerStore()
export default Store
