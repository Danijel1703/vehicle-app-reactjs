import { observable, action, makeObservable } from 'mobx'
import Helpers from '../Common/Helpers'

class VehicleStore {
  constructor () {
    this.numberOfPages = []
    this.currentPage = 1
    this.searchModels = []
    this.allModels = []
    this.allMakers = []
    this.currentPageModels = []
    this.selectedModel = {}
    this.selectedMaker = null
    this.name = ''
    this.newModelName = null
    this.newModelAbrv = null
    this.currentSort = null
    makeObservable(this, {
      numberOfPages: observable,
      currentPage: observable,
      searchModels: observable,
      allModels: observable,
      allMakers: observable,
      currentPageModels: observable,
      selectedModel: observable,
      selectedMaker: observable,
      newModelName: observable,
      newModelAbrv: observable,
      currentSort: observable,
      name: observable,
      setNumberOfPages: action,
      setCurrentPage: action,
      setSearchModels: action,
      setAllModels: action,
      setAllMakers: action,
      setCurrentPageModels: action,
      setSelectedModel: action,
      setSelectedMaker: action,
      setNewModelName: action,
      setNewModelAbrv: action,
      setCurrentSort: action,
      setName: action
    })
  }

  setNumberOfPages (numberOfModels) {
    this.numberOfPages = Helpers.toArray(Helpers.getNumberOfPages(numberOfModels))
  }

  setCurrentPage (currentPage) {
    this.currentPage = currentPage
  }

  setSearchModels (models) {
    this.searchModels = models
  }

  setAllModels (models) {
    this.allModels = models
  }

  setAllMakers (makers) {
    this.allMakers = makers
  }

  setCurrentPageModels (models) {
    this.currentPageModels = models
  }

  setSelectedModel (model) {
    this.selectedModel = model
  }

  setSelectedMaker (id) {
    this.selectedMaker = id
  }

  setName (name) {
    this.name = name
  }

  setNewModelName (name) {
    this.newModelName = name
  }

  setNewModelAbrv (abrv) {
    this.newModelAbrv = abrv
  }

  setCurrentSort (currentSort) {
    console.log(currentSort)
    this.currentSort = currentSort
  }
}

const Store = new VehicleStore()
export default Store
