import { useEffect } from 'react'
import '../Models.css'
import API from '../Common/API'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const Models = observer(({ store }) => {
  const numberOfPages = store.numberOfPages
  const currentPage = store.currentPage
  const searchModels = store.searchModels
  const allModels = store.allModels
  const currentPageModels = store.currentPageModels
  const currentSort = store.currentSort
  // eslint-disable-next-line no-unused-vars
  const images = store.images

  const fetchAllModels = async (sort = 'name') => {
    store.setCurrentSort(sort)
    const numberOfModels = await API.getNumberOfModels()
    store.setNumberOfPages(numberOfModels)
    const models = await API.getAllModels(numberOfModels, sort)
    models.forEach((model) => {
      model.page = Math.floor(models.indexOf(model) / 10) + 1
    })
    store.setAllModels(models)
    store.setCurrentPageModels(models.filter(model => model.page === currentPage))
  }
  const fetchSearchInputModel = async (input) => {
    const inputUpperCase = input.toUpperCase()
    if (input !== '') {
      store.setSearchModels(allModels.filter(model => model.name.toUpperCase().includes(inputUpperCase)))
    } else {
      store.setSearchModels([])
    }
  }

  useEffect(() => {
    fetchAllModels()
  }, [])

  const searchBar = (
    <input type='text' placeholder=' eg. Audi A4' onInput={e => {
      fetchSearchInputModel(e.target.value)
    }} />
  )
  const displayModels = currentPageModels?.map((model) => {
    return (
        <div className='car-card' key={model.id}>
          <img className='car-card-image' alt='Car image goes here' src={model.image} />
          <h1>Model: {model.name}</h1>
          <Link to={`/vehicleInfo/${model.id}`} className='more-info-button'>
            <button>More info</button>
          </Link>
        </div>
    )
  })
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
  const displaySearchedItems = searchModels?.map((searchModel) => (
      <Link to={`/vehicleInfo/${searchModel?.id}`} key={searchModel.id}>
        <li>
            {searchModel.name}
        </li>
      </Link>
  ))
  return (
        <div className='all-vehicles'>
          <div className='filter-options'>
            <div className='search-bar'>
              <h2>Search</h2>
              <div className='search-input'>
                {searchBar}
                {searchModels.length > 0 && <ul className='search-items'>{displaySearchedItems}</ul>}
              </div>
            </div>
            <div className='sort-by'>
                <h3>Sort by </h3>
                <h4
                className={currentSort === 'makeId' ? 'active' : ''}
                onClick={() => {
                  fetchAllModels('makeId')
                }}>Maker</h4>
                <h4
                className={currentSort === 'id' ? 'active' : ''}
                onClick={() => {
                  fetchAllModels('id')
                }}>id</h4>
                <h4
                className={currentSort === 'name' ? 'active' : ''}
                onClick={() => {
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

export default Models
