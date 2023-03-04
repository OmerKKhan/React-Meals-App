import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {

  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();
  const [text, setText] = useState('')

  const handleChange = (event) => {
    setText(event.target.value);
    console.log(text)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(text);
  }

  const handleRandomMeal = () => {
    setSearchTerm(text);
    setText('')
    fetchRandomMeal();
  }

  return <header className='search-container'>
    <form onSubmit={handleSubmit}>
      <input className='form-input' type='text' value={text} placeholder='type favorite meal' onChange={handleChange}></input>
      <button className='btn' type='submit'>Search</button>
      <button className='btn btn-hipster' type='button' onClick={handleRandomMeal}>Surprise Me!</button>
    </form>
  </header>
}
export default Search
