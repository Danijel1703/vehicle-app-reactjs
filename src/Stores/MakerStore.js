import { makeAutoObservable } from 'mobx'
import Helpers from '../Common/Helpers'

class MakerStore {
  constructor () {
    this.numberOfPages = []
    this.currentPage = 1
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
    makeAutoObservable(this)
  }

  setNumberOfPages (numberOfModels) {
    this.numberOfPages = Helpers.toArray(Helpers.getNumberOfPages(numberOfModels))
  }

  setCurrentPage (currentPage) {
    this.currentPage = currentPage
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
