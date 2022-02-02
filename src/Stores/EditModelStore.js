import { action, makeObservable, observable } from 'mobx'
import VehicleModelService from '../Common/VehicleModelService'

class EditModelStore {
  constructor () {
    this.id = null
    this.selectedModel = {}
    this.form = null
    makeObservable(this, {
      selectedModel: observable,
      id: observable,
      setSelectedModel: action,
      setId: action
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
}

const Store = new EditModelStore()
export default Store
