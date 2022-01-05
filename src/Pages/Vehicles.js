/* eslint-disable react/prop-types */
// import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import '../Vehicles.css'

const Vehicles = observer(({ VehicleStore }) => {
  const sortedByMaker = VehicleStore.sortedByMaker
  return (
    <div className='vehicles'>
      {
        sortedByMaker.map(({ maker, models }) => {
          return <div key={maker.id}><h1>Manufacturer: {maker.name}</h1>{
            models.map((model) => {
              return <h2 key={model.id}>Model: {model.name}</h2>
            })
          }</div>
        })
      }
    </div>
  )
})

export default Vehicles
