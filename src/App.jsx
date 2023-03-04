import './App.css'
import Meals from './Components/Meals'
import Modal from './Components/Modal'
import Favorites from './Components/Favorites'
import Search from './Components/Search'
import {useGlobalContext} from './context'

export default function App() {
  const {showModal, favorites} = useGlobalContext()
  return (
    <main>
      <Search />
      {favorites.length>0 && <Favorites />}
      <Meals />
      {showModal && <Modal/>}
      
    </main>
  )
}
