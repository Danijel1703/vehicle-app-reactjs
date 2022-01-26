import { action, makeObservable, observable, runInAction } from 'mobx'
import VehicleModelService from '../Common/VehicleModelService'
import VehicleMakeService from '../Common/VehicleMakeService'

class ModelStore {
  constructor () {
    this.currentPageModels = []
    this.currentSort = 'name'
    this.images = []
    this.sortDropdown = false
    this.whitelist = []
    this.allMakers = []
    makeObservable(this, {
      currentPageModels: observable,
      currentSort: observable,
      sortDropdown: observable,
      allMakers: observable,
      whitelist: observable,
      setAllMakers: action,
      setWhitelist: action,
      setCurrentPageModels: action,
      setCurrentSort: action,
      toggleSortDropdown: action
    })
  }

  async fetchCurrentPageModels (currentPage, sort = 'name') {
    const currentPageModels = await VehicleModelService.getCurrentPageModels(currentPage, sort)
    const filteredModels = currentPageModels.filter(model => this.whitelist.includes(model.makeId))
    this.whitelist.length > 0 ? this.setCurrentPageModels(filteredModels) : this.setCurrentPageModels(currentPageModels)
  }

  setCurrentPageModels (models) {
    this.currentPageModels = models
  }

  setCurrentSort (currentSort) {
    this.currentSort = currentSort
  }

  setImages (images) {
    this.images = images
  }

  toggleSortDropdown () {
    this.sortDropdown = !this.sortDropdown
  }

  setFilterMaker (whitelist) {
    this.filterMakers = whitelist
  }

  async setAllMakers () {
    const numberOfMakers = await VehicleMakeService.getNumberOfMakers()
    const allMakers = await VehicleMakeService.getAllMakers(numberOfMakers)
    runInAction(() => {
      this.allMakers = allMakers
    })
  }

  setWhitelist (event, makeId, currentPage) {
    const checked = event.target.checked
    if (checked) {
      this.whitelist.push(makeId)
    } else {
      const filteredWhitelist = this.whitelist.filter(id => id !== makeId)
      this.whitelist = filteredWhitelist
    }
    this.fetchCurrentPageModels(currentPage)
  }
}

const Store = new ModelStore()
export default Store
