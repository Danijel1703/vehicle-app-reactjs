import { observable, action, makeObservable } from 'mobx'
import Helpers from '../Common/Helpers'

class MakerStore {
  constructor () {
    this.numberOfPages = []
    this.currentPage = 1
    this.searchedMaker = null
    this.allModels = []
    this.allMakers = []
    this.currentPageMakers = []
    this.selectedMaker = {}
    this.name = ''
    this.newMakerName = null
    this.newMakerAbrv = null
    makeObservable(this, {
      numberOfPages: observable,
      currentPage: observable,
      searchedMaker: observable,
      allModels: observable,
      allMakers: observable,
      currentPageMakers: observable,
      selectedMaker: observable,
      name: observable,
      newMakerName: observable,
      newMakerAbrv: observable,
      setNumberOfPages: action,
      setCurrentPage: action,
      setSearchedMaker: action,
      setAllModels: action,
      setAllMakers: action,
      setCurrentPageMakers: action,
      setSelectedMaker: action,
      setNewMakerName: action,
      setNewMakerAbrv: action,
      setName: action
    })
  }

  setNumberOfPages (numberOfModels) {
    this.numberOfPages = Helpers.toArray(Helpers.getNumberOfPages(numberOfModels))
  }

  setCurrentPage (currentPage) {
    this.currentPage = currentPage
  }

  setSearchedMaker (maker) {
    this.searchedMaker = maker
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
}

const Store = new MakerStore()
export default Store
