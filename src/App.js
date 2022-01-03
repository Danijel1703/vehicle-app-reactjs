import Layout from './Layouts/Layout'
import './App.css'
import AudiA4 from './audi-a4.png'

function App () {
  return (
    <>
      <Layout>
        <div className='homepage'>
          <div className='newest-cars'>
            <div className='car-card'>
              <h1>Audi A4</h1>
              <img src={AudiA4} alt='audi' className='car-card-img' />
              <div><h2>0-100km/h:</h2><p>&nbsp;5.2s</p></div>
              <div><h2>CO2:</h2><p>&nbsp;173 g/km</p></div>
              <div><h2>Consumption:</h2><p>&nbsp;6 l/100km</p></div>
            </div>
            <div className='car-card'>
              <h1>Audi A4</h1>
              <img src={AudiA4} alt='audi' className='car-card-img' />
              <div><h2>0-100km/h:</h2><p>&nbsp;5.2s</p></div>
              <div><h2>CO2:</h2><p>&nbsp;173 g/km</p></div>
              <div><h2>Consumption:</h2><p>&nbsp;6 l/100km</p></div>
            </div>
            <div className='car-card'>
              <h1>Audi A4</h1>
              <img src={AudiA4} alt='audi' className='car-card-img' />
              <div><h2>0-100km/h:</h2><p>&nbsp;5.2s</p></div>
              <div><h2>CO2:</h2><p>&nbsp;173 g/km</p></div>
              <div><h2>Consumption:</h2><p>&nbsp;6 l/100km</p></div>
            </div>
            <div className='car-card'>
              <h1>Audi A4</h1>
              <img src={AudiA4} alt='audi' className='car-card-img' />
              <div><h2>0-100km/h:</h2><p>&nbsp;5.2s</p></div>
              <div><h2>CO2:</h2><p>&nbsp;173 g/km</p></div>
              <div><h2>Consumption:</h2><p>&nbsp;6 l/100km</p></div>
            </div>
            <div className='car-card'>
              <h1>Audi A4</h1>
              <img src={AudiA4} alt='audi' className='car-card-img' />
              <div><h2>0-100km/h:</h2><p>&nbsp;5.2s</p></div>
              <div><h2>CO2:</h2><p>&nbsp;173 g/km</p></div>
              <div><h2>Consumption:</h2><p>&nbsp;6 l/100km</p></div>
            </div>
            <div className='car-card'>
              <h1>Audi A4</h1>
              <img src={AudiA4} alt='audi' className='car-card-img' />
              <div><h2>0-100km/h:</h2><p>&nbsp;5.2s</p></div>
              <div><h2>CO2:</h2><p>&nbsp;173 g/km</p></div>
              <div><h2>Consumption:</h2><p>&nbsp;6 l/100km</p></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default App
