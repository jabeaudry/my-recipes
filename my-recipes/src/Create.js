import React, {useState} from 'react';
import './App.css';
//import comp
import AddIngredient from './Components/AddIngredient';
import IngredientList from './Components/IngredientList';
import TitlePicker from './Components/TitlePicker';
import LinkPicker from './Components/LinkPicker';
import ImagePicker from './Components/ImagePicker';
import {Route, Link} from 'react-router-dom';
//import axios from 'axios';


function Create() {
  const [inputText, setInputText] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeLink, setRecipeLink] = useState("");
  const [recipeImage, setRecipeImage] = useState("");

  //
  const submitRecipe = async () => {
    const data = {
      recipeTitle: recipeTitle,
      recipeLink: recipeLink,
      recipeImage: recipeImage,
      recipeIngredients: recipes.map((element) => element.text)
    };
    //call the post endpoint to submit the recipe
    const response = await fetch("http://localhost:5000/submitRecipe",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });


    //alternative to using fetch, depends on a package
    // axios.get("http://localhost:5000")
    // .then(data => console.log(data));
  }



  return (
    <div className="RecipeCreate">
      <header>
        <h1>Add a Recipe Manually</h1>
      </header>
      <TitlePicker recipeTitle = {recipeTitle} setRecipeTitle={setRecipeTitle} />
      <LinkPicker recipeLink = {recipeLink} setRecipeLink = {setRecipeLink} />
      <ImagePicker recipeImage = {recipeImage} setRecipeImage = {setRecipeImage} /> 
      <AddIngredient 
        recipes={recipes} 
        setRecipes={setRecipes} 
        setInputText={setInputText} 
        inputText={inputText}
      />
      <IngredientList setRecipes={setRecipes} recipes={recipes}/>
      <Link to="./view">
        <button onClick={submitRecipe}>
          Submit Recipe
        </button>
      </Link>
    </div>
  );
}


export default Create;