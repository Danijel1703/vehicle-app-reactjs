import { useEffect } from 'react/cjs/react.development'
import '../Vehicles.css'
import API from '../Common/API'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const Makers = observer(({ store }) => {
  const numberOfPages = store.numberOfPages
  const currentPage = store.currentPage
  const searchedMaker = store.searchedMaker
  const allMakers = store.allMakers
  const currentPageMakers = store.currentPageMakers

  const fetchAllMakers = async (sort = 'name') => {
    const numberOfMakers = await API.getNumberOfMakers()
    store.setNumberOfPages(numberOfMakers)
    const makers = await API.getAllMakers(numberOfMakers, sort)
    makers.forEach((maker) => {
      maker.page = Math.floor(makers.indexOf(maker) / 10) + 1
    })
    store.setAllMakers(makers)
    store.setCurrentPageMakers(makers.filter(maker => maker.page === currentPage))
  }
  const fetchSearchInputMaker = async (input) => {
    const maker = await API.getSearchInputMaker(input)
    store.setSearchedMaker(maker)
  }

  useEffect(() => {
    fetchAllMakers()
  }, [])

  const searchBar = (
    <input type='text' placeholder='Search models...' onInput={e => {
      fetchSearchInputMaker(e.target.value)
    }} />
  )
  const displayMakers = currentPageMakers?.map((maker) => (
    <div className='car-card' key={maker.id}>
      <img className='car-card-image' />
      <h1>Model: {maker.name}</h1>
      <Link to={`/makerInfo/${maker.id}`} className='more-info-button'>
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
          store.setCurrentPageModels(allMakers.filter(maker => maker.page === pageNumber))
        }}>
            {pageNumber}
        </li>
  ))
  const displaySearchedItems = (
    <div className='searched-item'>
      <Link to={`/makerInfo/${searchedMaker?.id}`}>
            <div className='searched-item-name'>
              <h3>{searchedMaker?.name}</h3>
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
            {searchedMaker ? displaySearchedItems : ''}
          </div>
        </div>
        <div className='sort-by'>
            <h3>Sort by </h3>
            <h4 onClick={() => {
              fetchAllMakers('id')
            }}>id</h4>
            <h4 onClick={() => {
              fetchAllMakers('name')
            }}>Name</h4>
        </div>
      </div>
      <div className='car-cards-container'>
        {displayMakers}
      </div>
      <div className='page-select'>
        <ul>
          {displayPageNavigation}
        </ul>
        </div>
    </div>
  )
})

export default Makers
