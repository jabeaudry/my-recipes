import React, {useEffect, useState} from 'react';
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import './css/View.css';

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

    //will only render the content provided by the user
    



     //hook that runs after the return function
    useEffect( () => {
        getIngredients();
        getSteps();
        getRecipeNameLinkImage();
    }, []);

    const areThereIngredients = () => {
        if (recipesIngr.length > 0) {
            console.log(recipesIngr.length);
            return (
                <div className = "ingreContainer">
                    <h2>Ingredients</h2>
                    {
                        recipesIngr.map((element)  => {
                            return(
                                <div>{element.ingredient}</div>
                            )
                        })
                    }
                </div>
            )
        }
    }
    const areThereSteps = () => {
        if (recipesSteps.length > 0) {
            return (
                <div className = "stepsContainer">
                    <h2>Steps</h2>
                        {
                            recipesSteps.map((element)  => {
                                return(
                                    <div>{element.steps}</div>
                                )
                            })
                        }       
                </div>
            )
        }
    }

    const isThereALink = (element) => {
        if (!(element === "")) {
            return (
                <a href={`${element}`}className = "viewing-link">Recipe link</a>
            )
        }
    }

    const isThereAnImage = (element) => {
        if (!(element === "")) {
            return (
                <img src={`${element}`} className="recipe-image"></img>
            )
        }
    }
        

    return(

        <div className="View">
            
            {
                //loads the title, image, link
                recipeNameImageLink.map((element) => {
                    return(
                        <div>
                            <h1>{element.recipeName}</h1>
                                {isThereAnImage(element.recipeImg)}    
                                {isThereALink(element.recipeLink)}
                            
                        </div>
                        
                    )
                })
            }
                
                <div className='viewBody'>
                    {
                    //loads the ingredients, if applicable
                        areThereIngredients() 
                    }     
                    {
                    //loads the steps, if applicable
                        areThereSteps()
                    }   
                </div>
        </div>
    )
}


export default View;