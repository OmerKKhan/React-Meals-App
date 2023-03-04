import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

  const getFavoritesFromLocalStorage=()=>{
    let favorites = localStorage.getItem('favorites')
    if(favorites){
      favorites=JSON.parse(localStorage.getItem('favorites'))
    }
    else{
      favorites=[];
    }
    return favorites;
  }

const AppProvider = ({ children }) => {

  const [meals, setMeals] = useState();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage);


  
  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((favorite) => favorite.idMeal === idMeal);
    if(alreadyFavorite) return
    
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites,meal];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites",JSON.stringify(updatedFavorites));
  }

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.idMeal!== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites",JSON.stringify(updatedFavorites));
  }
  
  const selectMeal = (idMeal,favoriteMeal) => {
    let meal;
    if(favoriteMeal){
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    }
    else{
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  
  const fetchMeals = async (url) => {
    try {
      setLoading(true)

      const { data } = await axios(url)
      console.log(data.meals)

      //set meals only if data is available otherwise set meals to empty array
      if (data.meals) {
        setMeals(data.meals)
      }
      else {
        setMeals([])
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  }

  const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])

  useEffect(() => {
    if (!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)

  }, [searchTerm])

  return (
    <AppContext.Provider value={{ meals, loading, setSearchTerm, fetchRandomMeal, 
                                 showModal, selectMeal, selectedMeal, closeModal,
                                favorites, addToFavorites, removeFromFavorites}}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }