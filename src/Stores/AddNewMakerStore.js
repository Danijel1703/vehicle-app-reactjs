import { action, makeObservable, observable } from 'mobx'

class AddNewMakerStore {
  constructor () {
    this.submit = null
    makeObservable(this, {
      submit: observable,
      setSubmit: action
    })
  }

  setSubmit (type) {
    this.submit = type
  }
}

const Store = new AddNewMakerStore()
export default Store
