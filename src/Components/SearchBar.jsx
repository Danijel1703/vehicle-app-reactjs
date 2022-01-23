import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../SearchBar.css'

const SearchBar = observer(({ store, pageName }) => {
  useEffect(() => {
    store.fetchModelsAndMakers()
  }, [])
  const placeholder = pageName === 'makers' ? ' eg. Audi' : ' eg. Audi A4'
  const searchElements = store.searchElements
  const displaySearchedItems = searchElements?.map((searchElement) => (
        <Link to={`/vehicleInfo/${searchElement?.id}`} key={searchElement.id}>
          <li>
                  {searchElement.name}
          </li>
        </Link>
  ))
  return (
    <div className='search-bar'>
    <h2>Search</h2>
    <div className='search-input'>
        <input type='text' placeholder={placeholder} onInput={e => {
          store.fetchSearchInputElements(e.target.value, pageName)
        }} />
      {searchElements.length > 0 && <ul className='search-items'>{displaySearchedItems}</ul>}
    </div>
  </div>
  )
})

export default SearchBar
