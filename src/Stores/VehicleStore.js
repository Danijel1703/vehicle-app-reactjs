// eslint-disable-next-line no-unused-vars
import { upload } from '@testing-library/user-event/dist/upload'
import { makeObservable, action, observable, autorun, runInAction, toJS } from 'mobx'
import API from '../Common/API'
import Helpers from '../Common/Helpers' // obicne helper funckije, kako Store nebi bio zatrpan kodovima kao sortiranje arrayjeva il slicno

class Vehicles {
  constructor () {
    this.totalMakers = null // ukupni broj proizvođaća u bazi, query se mora proci kroz sve stranice ukoliko ima vise od 10 proizvodaca
    this.totalModels = null // ukupni broj modela u bazi, služi nam za računanje broja stranica
    this.pagesMakers = null // broj stranica proizvodaca na backendu
    this.pagesModels = null // broj stranica modela na backendu
    this.currentPageModels = null // modeli sa trenutno odabrane stranice na frontend
    this.allModels = null // svi modeli
    this.selectedModel = null
    this.allMakers = null
    makeObservable(this, {
      totalMakers: observable,
      totalModels: observable,
      pagesMakers: observable,
      pagesModels: observable,
      selectedModel: observable,
      currentPageModels: observable,
      fetchNumberOfMakers: action,
      fetchNumberOfModels: action,
      fetchCurrentPageModels: action,
      fetchAllModels: action,
      fetchModelById: action,
      fetchAllMakers: action
    })
    autorun(() => {
      this.fetchNumberOfMakers()
      this.fetchNumberOfModels()
      this.fetchCurrentPageModels()
      this.fetchAllModels()
    })
  }

  async fetchNumberOfMakers () {
    const numberOfMakers = await API.getNumberOfMakers()
    runInAction(() => {
      this.numberOfMakers = numberOfMakers
      const pagesMakers = Helpers.getNumberOfPages(this.numberOfMakers)
      this.pagesMakers = Helpers.toArray(pagesMakers)
      this.fetchAllMakers(this.pagesMakers)
    })
  }

  async fetchNumberOfModels () {
    const numberOfModels = await API.getNumberOfModels()
    runInAction(async () => {
      this.numberOfModels = numberOfModels
      const pagesModels = Helpers.getNumberOfPages(this.numberOfModels)
      this.pagesModels = Helpers.toArray(pagesModels)
      this.fetchAllModels(this.pagesModels)
    })
  }

  async fetchCurrentPageModels (currentPage = 1) {
    const currentPageModels = await API.getCurrentPageModels(currentPage)
    runInAction(() => {
      this.currentPageModels = currentPageModels
    })
  }

  async fetchAllModels (numberOfPages = [1]) {
    const allModels = await API.getAllVehicles(numberOfPages)
    runInAction(() => {
      this.allModels = allModels
    })
  }

  async fetchAllMakers (numberOfPages = [1]) {
    const allMakers = await API.getAllMakers(numberOfPages)
    runInAction(() => {
      this.allMakers = allMakers
    })
  }

  async fetchModelById (id) {
    const selectedModel = await API.getModelById(id)
    runInAction(() => {
      this.selectedModel = selectedModel
    })
  }

  async updateSelectedModel (id, name) {
    const updateModel = await API.updateSelectedModel(id, name)
    console.log(toJS(updateModel))
  }

  async deleteSelectedModel (id) {
    const deleteModel = await API.deleteSelectedModel(id)
    console.log(toJS(deleteModel))
  }

  async addNewModel ({ makerId, model, abrv }) {
    const addModel = await API.addNewModel({ makerId, model, abrv })
    console.log(toJS(addModel))
  }
}

const VehicleStore = new Vehicles()

export default VehicleStore
