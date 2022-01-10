import { observable, action, makeObservable } from 'mobx'
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
    this.newMakerName = null
    this.newMakerAbrv = null
    this.currentSort = null
    makeObservable(this, {
      numberOfPages: observable,
      currentPage: observable,
      searchMakers: observable,
      allModels: observable,
      allMakers: observable,
      currentPageMakers: observable,
      selectedMaker: observable,
      name: observable,
      newMakerName: observable,
      newMakerAbrv: observable,
      currentSort: observable,
      setNumberOfPages: action,
      setCurrentPage: action,
      setSearchMakers: action,
      setAllModels: action,
      setAllMakers: action,
      setCurrentPageMakers: action,
      setSelectedMaker: action,
      setNewMakerName: action,
      setNewMakerAbrv: action,
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

  setNewMakerName (name) {
    this.newMakerName = name
  }

  setNewMakerAbrv (abrv) {
    this.newMakerAbrv = abrv
  }

  setCurrentSort (currentSort) {
    this.currentSort = currentSort
  }
}

const Store = new MakerStore()
export default Store
