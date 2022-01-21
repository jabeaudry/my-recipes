import React, {useEffect, useState} from 'react';
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";

function View() {
    const [recipesIngr, setRecipesIngr] = useState([]);
    const [recipesSteps, setRecipesSteps] = useState([]);
    const [recipeNameImageLink, setRecipeNameImageLink] = useState([]);
    let { id } = useParams();

    //fetches the ingredients
    const getIngredients = async () => {
        const response = await fetch(`http://localhost:5000/recIngr/${id}`);
        const data = await response.json();
        console.log(data);
        setRecipesIngr(data);
    };

    //fetches the steps
    const getSteps = async () => {
        const response = await fetch(`http://localhost:5000/recSteps/${id}`);
        const data = await response.json();
        console.log(data);
        setRecipesSteps(data);
    };

    //fetches the recipe name, link and image
    const getRecipeNameLinkImage = async () => {
        const response = await fetch(`http://localhost:5000/recipes/${id}`);
        const data = await response.json();
        console.log(data);
        setRecipeNameImageLink(data);
    };


     //hook that runs after the return function
    useEffect( () => {
        getIngredients();
        getSteps();
        getRecipeNameLinkImage();
    }, []);


    return(
        <div className="View">
            {
                //loads the title, image, link
                recipeNameImageLink.map((element) => {
                    return(
                        <div>
                            <h1>{element.recipeName}</h1>
                            <img src="${element.recipeImg}" className="recipe-image"></img>
                            <h1>{element.recipeLink}</h1>
                        </div>
                        
                    )
                })
            })
            {<h2>Ingredients:</h2>}
            {     
                //loads the ingredients      
                recipesIngr.map((element)  => {
                    return(
                        <div>{element.ingredient}</div>
                    )
                })
            }
            {<h2>Steps:</h2>}
            {
                //loads the ingredients      
                recipesSteps.map((element)  => {
                    return(
                        <div>{element.steps}</div>
                    )
                })
            }

        </div>
    )
}


export default View;