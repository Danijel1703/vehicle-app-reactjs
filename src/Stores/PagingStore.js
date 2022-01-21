import { action, makeObservable, observable } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'
import Helpers from '../Common/Helpers'

class PagingStore {
  constructor () {
    this.currentPage = 1
    this.numberOfPages = []
    makeObservable(this, {
      currentPage: observable,
      numberOfPages: observable,
      setNumberOfPages: action
    })
  }

  async fetchNumberOfPages (pageName = 'makers') {
    let numberOfElements = null
    if (pageName === 'makers') {
      numberOfElements = await VehicleMakeService.getNumberOfMakers()
    } else if (pageName === 'models') {
      numberOfElements = await VehicleMakeService.getNumberOfModels()
    }
    const numberOfPages = Helpers.toArray(Helpers.getNumberOfPages(numberOfElements))
    this.setNumberOfPages(numberOfPages)
  }

  setNumberOfPages (array) {
    this.numberOfPages = array
    console.log(this.numberOfPages)
  }

  setCurrentPage (currentPage) {
    this.currentPage = currentPage
  }
}

const Store = new PagingStore()
export default Store
