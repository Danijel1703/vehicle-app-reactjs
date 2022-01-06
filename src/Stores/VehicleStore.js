import { makeObservable, action, observable, autorun, runInAction, toJS } from 'mobx'
import API from '../Common/API'

class Vehicles {
  constructor () {
    this.models = [] // svi proizvođači
    this.makers = [] // svi modeli
    this.sortedByMaker = [] // array sa objektima u kojima su svakom proizvođaču dodijeljeni njihovi modeli
    this.numberOfPages = null
    makeObservable(this, {
      models: observable,
      makers: observable,
      sortedByMaker: observable,
      numberOfPages: observable,
      fetchAllVehicles: action,
      fetchAllMakers: action,
      fetchMakerVehicles: action,
      fetchNumberOfPages: action
    })
    autorun(() => {
      this.fetchNumberOfPages()
      this.fetchAllMakers()
      this.fetchAllVehicles()
    })
  }

  async fetchAllMakers () {
    const makers = await API.getAllMakers()
    runInAction(() => {
      this.makers = makers
      this.makers.forEach((maker) => {
        return this.fetchMakerVehicles(maker.id, maker.name, 2)
      })
    })
  }

  async fetchAllVehicles () {
    const models = await API.getAllVehicles() // Ovaj action trenutačno i nije bitan, možda bude trebao u budućnosti
    runInAction(() => {
      this.models = models
    })
  }

  async fetchNumberOfPages () {
    const numberOfPages = await API.getNumberOfPages()
    runInAction(() => {
      this.numberOfPages = numberOfPages
    })
    console.log(this.numberOfPages)
  }

  async fetchMakerVehicles (id, maker) {
    const makerVehicles = await API.getMakerVehicles(id)
    this.sortedByMaker.push({ maker, makerVehicles })
    console.log(toJS(this.sortedByMaker))
  }
}

const VehicleStore = new Vehicles()

export default VehicleStore
