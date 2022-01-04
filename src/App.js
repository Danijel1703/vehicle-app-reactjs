import Layout from './Layouts/Layout'
import './App.css'
import LatestModels from './Components/LatestModels'

function App () {
  return (
    <>
      <Layout>
        <div className='homepage'>
          <LatestModels />
        </div>
      </Layout>
    </>
  )
}

export default App
