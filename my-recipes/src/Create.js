import React, {useState} from 'react';

import './css/Create.css';
//import comp
import AddIngredient from './Components/AddIngredient';
import IngredientList from './Components/IngredientList';
import AddSteps from './Components/AddSteps';
import TitlePicker from './Components/TitlePicker';
import LinkPicker from './Components/LinkPicker';
import ImagePicker from './Components/ImagePicker';
import {Route, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
//import axios from 'axios';


function Create() {
  const [inputText, setInputText] = useState("");
  const [inputTextSteps, setInputTextSteps] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeLink, setRecipeLink] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeSteps, setRecipeSteps] = useState([]);


  //
  const submitRecipe = async () => {
    const data = {
      recipeTitle: recipeTitle,
      recipeLink: recipeLink,
      recipeImage: recipeImage,
      recipeIngredients: recipes.map((element) => element.text),
      recipeSteps: recipeSteps.map((element) => element.text)
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
        <h1>Create A Recipe</h1>
      </header>
      <div className = "form-container">
      <TitlePicker recipeTitle = {recipeTitle} setRecipeTitle={setRecipeTitle} />
      <LinkPicker recipeLink = {recipeLink} setRecipeLink = {setRecipeLink} />
      <ImagePicker recipeImage = {recipeImage} setRecipeImage = {setRecipeImage} /> 

      <h3>Add ingredients:</h3>
      <AddIngredient 
        recipes={recipes} 
        setRecipes={setRecipes} 
        setInputText={setInputText} 
        inputText={inputText}
      />
      <IngredientList setRecipes={setRecipes} recipes={recipes}/>
      
      <h3>Add steps:</h3>
      {/*steps section*/}
      <AddSteps 
        steps={recipeSteps} 
        setSteps={setRecipeSteps} 
        setInputText={setInputTextSteps} 
        inputText={inputTextSteps}
      />
      <IngredientList setRecipes={setRecipeSteps} recipes={recipeSteps}/>

      <Link to="/">
        <Button onClick={submitRecipe} variant="primary" bsPrefix="btn submit-button-create">
          Submit Recipe
        </Button>
      </Link>
      <Link to="/">
        <Button  variant="secondary" bsPrefix="btn submit-button-delete">
          Cancel
        </Button>
      </Link>
    </div>
    </div>
  );
}


export default Create;