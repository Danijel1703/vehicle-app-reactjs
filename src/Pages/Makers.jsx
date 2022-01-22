import { useEffect } from 'react'
import '../Makers.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Pagination from '../Components/Pagination'
import PagingStore from '../Stores/PagingStore'

const Makers = observer(({ store }) => {
  const currentPage = PagingStore.currentPage
  const searchMakers = store.searchMakers
  const allMakers = store.allMakers
  const currentPageMakers = store.currentPageMakers
  const currentSort = store.currentSort
  const images = store.images

  console.log(currentPage)
  const importAllImages = (r) => {
    return r.keys().map(r)
  }

  const fetchSearchInputMaker = async (input) => {
    const inputUpperCase = input.toUpperCase()
    if (input !== '') {
      store.setSearchMakers(allMakers.filter(maker => maker.name.toUpperCase().includes(inputUpperCase)))
    } else {
      store.setSearchMakers([])
    }
  }

  useEffect(() => {
    store.setImages(importAllImages(require.context('../Common/images-makers/', false, /\.(png|jpe?g|svg)$/)))
    store.fetchCurrentPageMakers(currentPage)
  }, [])

  const searchBar = (
    <input type='text' placeholder='Search models...' onInput={e => {
      fetchSearchInputMaker(e.target.value)
    }} />
  )
  const displayMakers = currentPageMakers?.map((maker) => {
    const image = images.filter(image => image.includes(maker.name))
    return (
    <div className='car-card' key={maker.id}>
      <img className='car-card-image' alt='Maker logo goes here' src={image}/>
      <h1>Maker: {maker.name}</h1>
      <Link to={`/makerInfo/${maker.id}`} className='more-info-button'>
        <button>More info</button>
      </Link>
    </div>
    )
  })
  const displaySearchedItems = searchMakers?.map((searchMaker) => (
    <Link to={`/makerInfo/${searchMaker?.id}`} key={searchMaker.id}>
      <li>
              {searchMaker.name}
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
            {searchMakers?.length > 0 && <ul className='search-items'>{displaySearchedItems}</ul>}
          </div>
        </div>
        <div className='sort-by'>
            <h3>Sort by </h3>
            <h4
            className={currentSort === 'id' ? 'active' : ''}
            onClick={() => {
            }}>id</h4>
            <h4
            className={currentSort === 'name' ? 'active' : ''}
            onClick={() => {
            }}>Name</h4>
        </div>
      </div>
      <div className='car-cards-container'>
        {displayMakers}
      </div>
      <Pagination store = {PagingStore} pageName = 'makers' />
    </div>
  )
})

export default Makers
