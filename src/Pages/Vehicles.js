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
    <input type='text' placeholder='Search models...' onInput={e => {
      fetchSearchInputModel(e.target.value)
    }} />
  )
  const displayModels = currentPageModels?.map((model) => (
        <div className='car-card' key={model.id}>
          <img className='car-card-image' />
          <h1>Model: {model.name}</h1>
          <Link to={`/vehicleInfo/${model.id}`} className='more-info-button'>
            <button>More info</button>
          </Link>
        </div>
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
    <div className='searched-item'>
      <Link to={`/vehicleInfo/${searchedModel?.id}`}>
            <div className='searched-item-name'>
              <h3>{searchedModel?.name}</h3>
            </div>
      </Link>
    </div>
  )

  return (
        <div className='all-vehicles'>
          <div className='filter-options'>
            <div className='search-bar'>
              <h2>Search</h2>
              <div className='search-input'>
                {searchBar}
                {searchedModel ? displaySearchedItems : ''}
              </div>
            </div>
            <div className='sort-by'>
                <h3>Sort by </h3>
                <h4 onClick={() => {
                  fetchAllModels('makeId')
                }}>Maker</h4>
                <h4 onClick={() => {
                  fetchAllModels('id')
                }}>id</h4>
                <h4 onClick={() => {
                  fetchAllModels('name')
                }}>Name</h4>
            </div>
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
