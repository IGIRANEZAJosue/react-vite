import { useState, useEffect } from 'react';
import './App.css'
import Recipe from './Recipe';

function App() {

	const APP_ID = "ba443d41";
	const APP_KEY = "79a550f21f0882a479222a8474b5f523";

	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("chicken");

	useEffect(() => {
		getRecipes();
	}, [query]);	

	const getRecipes = async () => {
		const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
		const data = await response.json();
		setRecipes(data.hits);
	}

	const updateSearch = e => {
		setSearch(e.target.value);
	}

	const getSearch = e => {
		e.preventDefault();
		setQuery(search); 
	}

  	return (
    	<div className="App">
        	<form onSubmit={getSearch} className ="search-form">
				<input className='search-bar' type="text" value={search} onChange={updateSearch} />
				<button className="search-btn" type='submit'>Search</button>
			</form> 

			<div className="recipes">
				{recipes.map(recipe => (
					<Recipe key={recipe.recipe.label} title ={recipe.recipe.label} calories ={recipe.recipe.calories} image ={recipe.recipe.image} />
				))}
			</div>

    	</div>
  	)
}

export default App
