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
    const [recipeNameImageLink, setRecipeNameImageLink] = useState([]);
    let { id } = useParams();

    //fetches the ingredients
    const getIngredients = async () => {
        const response = await fetch(`http://localhost:5000/recIngr/${id}`);
        const data = await response.json();
        console.log(data);
        setRecipesIngr(data);
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
        getRecipeNameLinkImage();
    }, []);


    return(
        <div className="View">
            {
                //loads the title, image, link
                recipeNameImageLink.map((element) => {
                    return(
                        [
                            <h1>{element.recipeName}</h1>,
                            <h1>{element.recipeImg}</h1>,
                            <h1>{element.recipeLink}</h1>
                        ]
                    )
                })
            }

            {     
                //loads the ingredients      
                recipesIngr.map((element)  => {
                    return(
                        <h1>{element.ingredient}</h1>
                    )
                })
            }

        </div>
    )
}


export default View;