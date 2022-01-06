// import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useState } from 'react/cjs/react.development'
import '../AllVehicles.css'

const AllVehicles = observer(({ VehicleStore }) => {
  const numberOfPages = VehicleStore.pagesModels
  const [currentPage, setCurrentPage] = useState(1)
  const currentPageModels = VehicleStore.currentPageModels
  // const allModels = VehicleStore.allModels

  return (
        <div className='all-vehicles'>
          <div className='car-cards-container'>
            {
              currentPageModels?.map((model) => {
                return <h1 key={model.id}>{model.name}</h1>
              })
            }
          </div>
          <div className='page-select'>
            <ul>
              {
                numberOfPages?.map((pageNumber) => {
                  return <li
                    className={currentPage === pageNumber ? 'active' : ''}
                     key={pageNumber} onClick={() => {
                       setCurrentPage(pageNumber)
                       VehicleStore.fetchCurrentPageModels(pageNumber)
                     }}>{pageNumber}</li>
                })
              }
            </ul>
          </div>
        </div>
  )
})

export default AllVehicles
