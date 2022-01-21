import { action, makeObservable, observable } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'

class MakerStore {
  constructor () {
    this.searchMakers = null
    this.allModels = []
    this.allMakers = []
    this.currentPageMakers = []
    this.selectedMaker = {}
    this.name = ''
    this.abrv = ''
    this.newMakerName = null
    this.newMakerAbrv = null
    this.currentSort = null
    this.images = []
    makeObservable(this, {
      currentPageMakers: observable,
      setCurrentPageMakers: action
    })
  }

  async fetchCurrentPageMakers (currentPage, sort = 'name') {
    const currentPageMakers = await VehicleMakeService.getCurrentPageMakers(currentPage, sort)
    console.log(currentPageMakers)
    this.setCurrentPageMakers(currentPageMakers)
  }

  setSearchMakers (maker) {
    this.searchMakers = maker
  }

  setAllModels (models) {
    this.allModels = models
  }

  setAllMakers (makers) {
    this.allMakers = makers
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
