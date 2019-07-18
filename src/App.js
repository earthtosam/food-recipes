import React, { useEffect, useState} from "react";
import Recipe from './Recipe';
import "./App.css";

const App = () => {
  const APP_ID = "bf2fdbf1";
  const APP_KEY = "7a0b41e0b8a401a6021b764fc10ff45c";

  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
        className="search-bar" 
        type="text" 
        placeholder="Chicken"
        value={search} 
        onChange={updateSearch} 
        />
        <button className="search-button" type="submit">
          Go!
        </button>  
      </form>
      <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
