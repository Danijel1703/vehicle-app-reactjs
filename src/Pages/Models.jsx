import { useEffect } from 'react'
import '../Models.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Pagination from '../Components/Pagination'
import PagingStore from '../Stores/PagingStore'

const Models = observer(({ store }) => {
  const currentPage = store.currentPage
  const searchModels = store.searchModels
  const allModels = store.allModels
  const currentPageModels = store.currentPageModels
  const currentSort = store.currentSort
  const images = store.images
  console.log(currentPage)

  const importAllImages = (r) => {
    return r.keys().map(r)
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
    store.setImages(importAllImages(require.context('../Common/images-models/', false, /\.(png|jpe?g|svg)$/)))
  }, [])

  const searchBar = (
    <input type='text' placeholder=' eg. Audi A4' onInput={e => {
      fetchSearchInputModel(e.target.value)
    }} />
  )
  const displayModels = currentPageModels?.map((model) => {
    const image = images.filter(image => image.includes(model.name))
    return (
        <div className='car-card' key={model.id}>
          <img className='car-card-image' alt='Car image goes here' src={image}/>
          <h1>Model: {model.name}</h1>
          <Link to={`/vehicleInfo/${model.id}`} className='more-info-button'>
            <button>More info</button>
          </Link>
        </div>
    )
  })
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
                }}>Maker</h4>
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
            {displayModels}
          </div>
          <Pagination store = {PagingStore} pageName = 'models' />
        </div>
  )
})

export default Models
