import { action, makeObservable, observable, runInAction } from 'mobx'
import VehicleModelService from '../Common/VehicleModelService'
import VehicleMakeService from '../Common/VehicleMakeService'

class ModelStore {
  constructor () {
    this.currentPageModels = []
    this.currentSort = 'name'
    this.images = []
    this.sortDropdown = false
    this.whitelist = null
    this.allMakers = []
    this.filterId = null
    makeObservable(this, {
      currentPageModels: observable,
      currentSort: observable,
      sortDropdown: observable,
      allMakers: observable,
      whitelist: observable,
      filterId: observable,
      setAllMakers: action,
      setWhitelist: action,
      setCurrentPageModels: action,
      setCurrentSort: action,
      toggleSortDropdown: action,
      setFilterId: action
    })
  }

  async fetchCurrentPageModels (currentPage = 1, sort = 'name') {
    let currentPageModels = null
    if (this.whitelist === null) {
      currentPageModels = await VehicleModelService.getCurrentPageModels(currentPage, sort)
    } else {
      currentPageModels = await VehicleModelService.getFilteredModels(currentPage, sort, this.whitelist)
    }
    this.setCurrentPageModels(currentPageModels)
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

  async setAllMakers () {
    const numberOfMakers = await VehicleMakeService.getNumberOfMakers()
    const allMakers = await VehicleMakeService.getAllMakers(numberOfMakers)
    runInAction(() => {
      this.allMakers = allMakers
    })
  }

  setFilterId (id) {
    this.filterId = id
  }

  async setWhitelist (event, makeId, currentPage) {
    const checked = event.target.checked
    if (this.filterId === null || this.filterId === event.target.id) {
      this.setFilterId(event.target.id)
    } else if (this.filterId !== null && this.filterId !== event.target.id) {
      document.getElementById(this.filterId).checked = false
      this.setFilterId(event.target.id)
    } else {
      this.setFilterId(event.target.id)
    }
    if (checked) {
      this.whitelist = makeId
      this.fetchCurrentPageModels()
    } else {
      this.whitelist = null
      this.fetchCurrentPageModels(currentPage)
    }
  }
}

const Store = new ModelStore()
export default Store
