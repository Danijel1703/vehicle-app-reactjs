import { action, makeObservable, observable } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'

class MakerStore {
  constructor () {
    this.currentPageMakers = []
    this.selectedMaker = {}
    this.name = ''
    this.abrv = ''
    this.newMakerName = null
    this.newMakerAbrv = null
    this.currentSort = 'name'
    this.images = []
    makeObservable(this, {
      currentPageMakers: observable,
      currentSort: observable,
      setCurrentPageMakers: action,
      setCurrentSort: action
    })
  }

  async fetchCurrentPageMakers (currentPage = 1, sort = 'name') {
    const currentPageMakers = await VehicleMakeService.getCurrentPageMakers(currentPage, sort)
    this.setCurrentPageMakers(currentPageMakers)
  }

  setCurrentPageMakers (makers) {
    this.currentPageMakers = makers
  }

  setSelectedMaker (maker) {
    this.selectedMaker = maker
  }

  setName (name) {
    this.name = name
  }

  setAbrv (abrv) {
    this.abrv = abrv
  }

  setNewMakerName (name) {
    this.newMakerName = name
  }

  setNewMakerAbrv (abrv) {
    this.newMakerAbrv = abrv
  }

  setCurrentSort (currentSort) {
    this.currentSort = currentSort
  }

  setImages (images) {
    this.images = images
  }
}

const Store = new MakerStore()
export default Store
