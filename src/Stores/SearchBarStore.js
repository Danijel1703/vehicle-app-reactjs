import { action, makeObservable, observable } from 'mobx'
import VehicleModelService from '../Common/VehicleModelService'
import VehicleMakeService from '../Common/VehicleMakeService'

class SearchBarStore {
  constructor () {
    this.allModels = []
    this.allMakers = []
    this.searchElements = []
    makeObservable(this, {
      allMakers: observable,
      allModels: observable,
      searchElements: observable,
      setAllModels: action,
      setAllMakers: action,
      setSearchElements: action
    })
  }

  async fetchModelsAndMakers () {
    const numberOfModels = await VehicleModelService.getNumberOfModels()
    const numberOfMakers = await VehicleMakeService.getNumberOfMakers()
    const allModels = await VehicleModelService.getAllModels(numberOfModels)
    const allMakers = await VehicleMakeService.getAllMakers(numberOfMakers)
    this.setAllMakers(allMakers)
    this.setAllModels(allModels)
  }

  setAllModels (models) {
    this.allModels = models
  }

  setAllMakers (makers) {
    this.allMakers = makers
  }

  fetchSearchInputElements (input, pageName) {
    const inputUpperCase = input.toUpperCase()
    const search = pageName === 'makers' ? this.allMakers : this.allModels
    if (input !== '') {
      this.setSearchElements(search.filter(element => element.name.toUpperCase().includes(inputUpperCase)))
    } else {
      this.setSearchElements([])
    }
  }

  setSearchElements (elements) {
    this.searchElements = elements
  }
}

const Store = new SearchBarStore()
export default Store
