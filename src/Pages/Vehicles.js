/* eslint-disable react/prop-types */
// import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import '../Vehicles.css'

const Vehicles = observer(({ VehicleStore }) => {
  return (
    <div className='vehicles'>
      <div className='item-a' style={{ backgroundColor: 'green' }}>1</div>
      <div className='item-b' style={{ backgroundColor: 'blue' }}>2</div>
      <div className='item-c' style={{ backgroundColor: 'red' }}>3</div>
    </div>
  )
})

export default Vehicles
