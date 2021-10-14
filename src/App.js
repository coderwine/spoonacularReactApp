// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
// Components
import SiteBar from './components/Navbar/Navbar';
import SearchRecipe from './components/Recipes/SearchRecipes';

function App() {

  const appProps = {
    searchRecipe: 'https://api.spoonacular.com/recipes/complexSearch',
  }

  return (
    <div className="App">
      <SiteBar />
      <SearchRecipe url={appProps} />
    </div>
  );
}

export default App;
