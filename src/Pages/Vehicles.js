import { observer } from 'mobx-react'
import { useEffect, useState } from 'react/cjs/react.development'
import '../Vehicles.css'
import API from '../Common/API'
import { Link } from 'react-router-dom'
import Helpers from '../Common/Helpers'

const Vehicles = observer(({ VehicleStore }) => {
  const [numberOfPages, setNumberOfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageModels, setCurrentPageModels] = useState(null)

  const fetchNumberOfPages = async () => {
    const numberOfModels = await API.getNumberOfModels()
    setNumberOfPages(Helpers.toArray(Helpers.getNumberOfPages(numberOfModels)))
  }
  const fetchCurrentPageModels = async (page = 1) => {
    const models = await API.getCurrentPageModels(page)
    setCurrentPageModels(models)
  }

  useEffect(() => {
    fetchNumberOfPages()
    fetchCurrentPageModels()
  }, [])

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
                       fetchCurrentPageModels(pageNumber)
                       setCurrentPage(pageNumber)
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
