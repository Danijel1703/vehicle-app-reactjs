import { makeObservable, action, observable, autorun, runInAction } from 'mobx'
import API from '../Common/API'

class Vehicles {
  constructor () {
    this.models = [] // svi proizvođači
    this.makers = [] // svi modeli
    this.sortedByMaker = [] // array sa objektima u kojima su svakom proizvođaču dodijeljeni njihovi modeli
    makeObservable(this, {
      models: observable,
      makers: observable,
      fetchAllVehicles: action,
      fetchAllMakers: action,
      fetchMakerVehicles: action
    })
    autorun(() => {
      this.fetchAllMakers()
      this.fetchAllVehicles()
    })
  }

  async fetchAllMakers () {
    const makers = await API.getAllMakers()
    runInAction(() => {
      this.makers = makers
      this.makers.map((maker) => {
        return this.fetchMakerVehicles(maker.id, maker.name)
      })
    })
  }

  async fetchAllVehicles () {
    const models = await API.getAllVehicles() // Ovaj action trenutačno i nije toliko bitan, možda bude trebao u budućnosti
    runInAction(() => {
      this.models = models
    })
  }

  async fetchMakerVehicles (id, maker) {
    const makerVehicles = await API.getMakerVehicles(id)
    this.sortedByMaker.push({ maker, makerVehicles })
  }
}

const VehicleStore = new Vehicles()

export default VehicleStore
