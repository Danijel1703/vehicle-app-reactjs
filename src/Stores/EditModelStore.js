import { action, makeObservable, observable } from 'mobx'
import VehicleModelService from '../Common/VehicleModelService'

class EditModelStore {
  constructor () {
    this.editName = ''
    this.editAbrv = ''
    this.selectedModel = {}
    makeObservable(this, {
      editName: observable,
      editAbrv: observable,
      selectedModel: observable,
      setEditName: action,
      setEditAbrv: action,
      setSelectedModel: action
    })
  }

  setEditName (name) {
    this.editName = name
  }

  setEditAbrv (abrv) {
    this.editAbrv = abrv
  }

  async getSelectedModel (id) {
    const model = await VehicleModelService.getModelById(id)
    this.setSelectedModel(model)
  }

  setSelectedModel (model) {
    this.selectedModel = model
  }

  async updateSelectedModel (id, name, abrv) {
    if (!name || !abrv) {
      window.alert('Unsuccessful, all values must be filled.')
    } else {
      await VehicleModelService.updateSelectedModel(id, name, abrv)
      if (confirm('Edit successful.')) {
        window.location.href = '/'
      }
    }
  }

  async deleteSelectedModel (id) {
    await VehicleModelService.deleteSelectedModel(id)
    if (confirm('Delete successful.')) {
      window.location.href = '/'
    }
  }
}

const Store = new EditModelStore()
export default Store
