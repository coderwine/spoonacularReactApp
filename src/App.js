// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
// Components
import SiteBar from './components/Navbar/Navbar';
import SearchRecipe from './components/Recipes/SearchRecipes';
import spoonKey from './keys';

function App() {

  const baseURL = 'https://api.spoonacular.com/recipes/complexSearch'

  const [ inputValue, setInputValue ] = useState('')
  const [ searchValue, setSearchValue ] = useState('');
  const [ recipeArr, setRecipeArr ] = useState([]);
  const [ lastPg, setLastPg ] = useState(0);
  const [ pgNumber, setPgNumber ] = useState(0); 

  //! SEARCH ITEM
  useEffect(() => {
    search()
  }, [pgNumber, searchValue])

  const searchTerm = () => {
        setSearchValue(inputValue);
        setInputValue('');
    }

    async function search() {
        console.log(searchValue);
        console.log(inputValue);

        // let buildURL = `${props.url.searchRecipe}?apiKey=${spoonKey}&query=${searchValue}`;
        let buildURL = `${baseURL}?apiKey=${spoonKey}&query=${searchValue}`;

        // console.log('pagenumber:', pgNumber);

        if (pgNumber > 0) {
            buildURL = buildURL + `&offset=${pgNumber}`
        }

        const response = await fetch(buildURL);
        const data = await response.json();

        setInputValue('');
        console.log('data', data);
        console.log(data.totalResults)
        setLastPg(data.totalResults);
        setRecipeArr(data.results);
        // props.url.recipeArr.push(data.results);
        // console.log(props);
    }

    const pageShift = (pos) => {
        
        switch (true) {
            case pos === 'list start':
                setPgNumber(0);
                break;
            case pos === 'back one':
                setPgNumber(pgNumber-10);
                break;
            case pos === 'forward one':
                setPgNumber(pgNumber+10);
                break;
            case pos === 'list end':
                setPgNumber(lastPg - 10);
                break;
            default:
                console.log('pagination value is invalid');
        }
    }
    
    //! PROPS
    const searchProps = {
      searchRecipe: baseURL,
      recipeArr: recipeArr,
      pgShift: () => pageShift(),
      term: () => searchTerm(),
      input: setInputValue
    }

  return (
    <div className="App">
      <SiteBar />
      <SearchRecipe search={searchProps} />
    </div>
  );
}

export default App;
