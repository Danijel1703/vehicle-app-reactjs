import { makeObservable, action, observable, autorun, runInAction } from 'mobx'
import API from '../Common/API'

class Vehicles {
  constructor () {
    this.models = null
    this.makers = null
    makeObservable(this, {
      models: observable,
      makers: observable,
      fetchVehicles: action,
      fetchMakers: action
    })
    autorun(() => {
      this.fetchMakers()
      this.fetchVehicles()
    })
  }

  async fetchMakers () {
    const makers = await API.getAllMakers()
    runInAction(() => {
      this.makers = makers
    })
  }

  async fetchVehicles () {
    const models = await API.getAllVehicles()
    runInAction(() => {
      this.models = models
      console.log(this.models)
    })
  }
}

const VehicleStore = new Vehicles()

export default VehicleStore
