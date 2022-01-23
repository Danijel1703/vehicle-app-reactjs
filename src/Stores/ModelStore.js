import { action, makeObservable, observable } from 'mobx'
import VehicleModelService from '../Common/VehicleModelService'

class ModelStore {
  constructor () {
    this.currentPageModels = []
    this.selectedMaker = null
    this.newModelName = null
    this.newModelAbrv = null
    this.currentSort = 'name'
    this.images = []
    makeObservable(this, {
      currentPageModels: observable,
      currentSort: observable,
      setCurrentPageModels: action,
      setCurrentSort: action
    })
  }

  async fetchCurrentPageModels (currentPage, sort = 'name') {
    const currentPageMakers = await VehicleModelService.getCurrentPageModels(currentPage, sort)
    this.setCurrentPageModels(currentPageMakers)
  }

  setCurrentPageModels (models) {
    this.currentPageModels = models
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

  setCurrentSort (currentSort) {
    this.currentSort = currentSort
  }

  setImages (images) {
    this.images = images
  }
}

const Store = new ModelStore()
export default Store
