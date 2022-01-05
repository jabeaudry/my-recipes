import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Route, Link, Router} from 'react-router-dom';
import NoRecipes from './Components/NoRecipes'; 



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

    return(
        <div className="Menu">
            <header>
                <h1>My Recipes</h1>
            </header>
            {
                recipes.map((element)  => {
                    return(
                        <Link to={"/view/" + element.recipeID}>
                            <li>{element.recipeName}</li>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Menu;