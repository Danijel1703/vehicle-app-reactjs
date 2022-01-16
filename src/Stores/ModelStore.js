import { makeAutoObservable } from 'mobx'
import Helpers from '../Common/Helpers'

class ModelStore {
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
    this.abrv = ''
    this.newModelName = null
    this.newModelAbrv = null
    this.currentSort = null
    this.images = []
    makeAutoObservable(this)
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

  setAbrv (abrv) {
    this.abrv = abrv
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
