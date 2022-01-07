import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import '../Vehicles.css'

const Vehicles = observer(({ VehicleStore }) => {
  const numberOfPages = VehicleStore.pagesModels
  const [currentPage, setCurrentPage] = useState(1)
  const currentPageModels = VehicleStore.currentPageModels
  // const allModels = VehicleStore.allModels

  return (
        <div className='all-vehicles'>
          <div className='car-cards-container'>
            {
              currentPageModels?.map((model) => {
                return (
                  <Link to={`/VehicleInfo/${model.id}`} key={model.id}>
                    <button>{model.name}</button>
                  </Link>
                )
              })
            }
          </div>
          <div className='page-select'>
            <ul>
              {
                numberOfPages?.map((pageNumber) => {
                  return (
                    <li
                    className={currentPage === pageNumber ? 'active' : ''}
                     key={pageNumber} onClick={() => {
                       setCurrentPage(pageNumber)
                       VehicleStore.fetchCurrentPageModels(pageNumber)
                     }}>{pageNumber}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
  )
})

export default Vehicles
