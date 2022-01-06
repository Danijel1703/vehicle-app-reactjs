/* eslint-disable react/prop-types */
// import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import '../Vehicles.css'

const Vehicles = observer(({ VehicleStore }) => {
  return (
    <div className='vehicles'>
      <div className='car-list'>
        <button className='slide-right'>Slide right</button>
        <div className='car-list-card'>
          Audi A4
        </div>
        <button className='slide-left'>Slide left</button>
      </div>
    </div>
  )
})

export default Vehicles
