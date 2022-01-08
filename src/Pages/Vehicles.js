import { useEffect, useState } from 'react/cjs/react.development'
import '../Vehicles.css'
import API from '../Common/API'
import Helpers from '../Common/Helpers'
import { Link } from 'react-router-dom'

const Vehicles = () => {
  const [numberOfPages, setNumberOfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageModels, setCurrentPageModels] = useState(null)
  const [searchedModel, setModelSearchedModel] = useState(null)

  const fetchNumberOfPages = async () => {
    const numberOfModels = await API.getNumberOfModels()
    setNumberOfPages(Helpers.toArray(Helpers.getNumberOfPages(numberOfModels)))
  }
  const fetchCurrentPageModels = async (page = 1, sort = 'name') => {
    const models = await API.getCurrentPageModels(page, sort)
    setCurrentPageModels(models)
  }

  const fetchSearchInputModel = async (input) => {
    const model = await API.getSearchInputModel(input)
    setModelSearchedModel(model)
  }

  useEffect(() => {
    fetchNumberOfPages()
    fetchCurrentPageModels()
  }, [])

  const sortOptions = (
    <label>
      Maker:
      <input type='checkbox' onChange={ e => {
        if (e.target.checked) {
          fetchCurrentPageModels(currentPage, 'makeId')
        } else {
          fetchCurrentPageModels(currentPage, 'name')
        }
      }} />
    </label>
  )
  const searchElement = (
    <input type='text' onInput={e => {
      fetchSearchInputModel(e.target.value)
    }} />
  )
  const displayModels = currentPageModels?.map((model) => (
    <Link key={model.id} to={`/vehicleInfo/${model.id}`}><button>{model.name}</button></Link>
  ))
  const displayPageNavigation = numberOfPages?.map((pageNumber) => (
        <li
        key={pageNumber}
        className={currentPage === pageNumber ? 'active' : ''}
        onClick={() => {
          fetchCurrentPageModels(pageNumber)
          setCurrentPage(pageNumber)
        }}>
            {pageNumber}
        </li>
  ))
  const displaySearchedItems = (
    <h1>{searchedModel?.name}</h1>
  )

  return (
        <div className='all-vehicles'>
          <div className='search-options'>
            <div className='searchElement'>
              {searchElement}
            </div>
            <div className='sort-by'>
              {sortOptions}
            </div>
            {displaySearchedItems}
          </div>
          <div className='car-cards-container'>
            {displayModels}
          </div>
          <div className='page-select'>
            <ul>
              {displayPageNavigation}
            </ul>
          </div>
        </div>
  )
}

export default Vehicles
