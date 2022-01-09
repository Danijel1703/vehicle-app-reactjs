import { useEffect } from 'react/cjs/react.development'
import '../Vehicles.css'
import API from '../Common/API'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const Vehicles = observer(({ store }) => {
  const numberOfPages = store.numberOfPages
  const currentPage = store.currentPage
  const searchedModel = store.searchedModel
  const allModels = store.allModels
  const currentPageModels = store.currentPageModels

  const fetchAllModels = async (sort = 'name') => {
    const numberOfModels = await API.getNumberOfModels()
    store.setNumberOfPages(numberOfModels)
    const models = await API.getAllVehicles(numberOfModels, sort)
    models.forEach((model) => {
      model.page = Math.floor(models.indexOf(model) / 10) + 1
    })
    store.setAllModels(models)
    store.setCurrentPageModels(models.filter(model => model.page === currentPage))
  }
  const fetchSearchInputModel = async (input) => {
    const model = await API.getSearchInputModel(input)
    store.setSearchedModel(model)
  }

  useEffect(() => {
    fetchAllModels()
  }, [])

  const searchBar = (
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
        className={pageNumber === store.currentPage ? 'active' : ''}
        onClick={() => {
          store.setCurrentPage(pageNumber)
          store.setCurrentPageModels(allModels.filter(model => model.page === pageNumber))
        }}>
            {pageNumber}
        </li>
  ))
  const displaySearchedItems = (
    <h1>{searchedModel?.name}</h1>
  )

  return (
        <div className='all-vehicles'>
          <div className='filter-options'>
            <div className='search-bar'>
              <h2>Search: </h2>
              {searchBar}
            </div>
            <div className='sort-by'>
              <h3>Sort by: </h3>
              <h3 onClick={() => {
                fetchAllModels('makeId')
              }}>Maker</h3>
              <h3 onClick={() => {
                fetchAllModels('id')
              }}>id</h3>
              <h3 onClick={() => {
                fetchAllModels('name')
              }}>Name</h3>
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
})

export default Vehicles
