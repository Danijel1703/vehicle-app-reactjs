import { action, makeObservable, observable } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'

class MakerStore {
  constructor () {
    this.currentPageMakers = []
    this.currentSort = 'name'
    this.images = []
    this.sortDropdown = false
    makeObservable(this, {
      currentPageMakers: observable,
      currentSort: observable,
      sortDropdown: observable,
      setCurrentPageMakers: action,
      setCurrentSort: action,
      toggleSortDropdown: action
    })
  }

  async fetchCurrentPageMakers (currentPage = 1, sort = 'name') {
    const currentPageMakers = await VehicleMakeService.getCurrentPageMakers(currentPage, sort)
    this.setCurrentPageMakers(currentPageMakers)
  }

  setCurrentPageMakers (makers) {
    this.currentPageMakers = makers
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
}

const Store = new MakerStore()
export default Store
