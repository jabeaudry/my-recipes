import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Route, Link, Router} from 'react-router-dom';
import NoRecipes from './Components/NoRecipes'; 
import './css/Menu.css';


function Menu (){
    const [recipes, setRecipes] = useState([]);
    
    
    const getRecipeName = async () => {
        const response = await fetch('http://localhost:5000/recipes') 
        const data = await response.json();
        console.log(data);
        setRecipes(data);
    }

    //hook that runs after the return function
    useEffect( () => {
        getRecipeName();
    }, []);

    //verifies URLs for images
    function checkURL(url) {
        if (url.match(/\.(jpeg|jpg|gif|png)$/) != null){
            return true;
        }
        else {
            return false;
        }
    }

    return(
        <div className="Menu">
        <div className="background-img"></div>    
            <header>
                <h1>My Recipes</h1>
            </header>
            <div className = "recipes-container">
                <Link to={"/create/"}>
                    <div className="create-recipe-button">
                        Create Recipe
                    </div>
                </Link>
                
                {
                    recipes.map((element)  => {
                        return(
                                <Link to={"/view/" + element.recipeID}>
                                    <div className = "recipe-square">
                                        <li key={Math.random()*1000}>{element.recipeName}</li>
                                    </div> 
                                </Link>
                            
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Menu;