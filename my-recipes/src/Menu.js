import React from 'react'
import {Route, Link, Router} from 'react-router-dom';
import NoRecipes from './Components/NoRecipes';



const getRecipeName = async () => {
    const response = await fetch('http://localhost:5000/recipes'); 
	console.log(response.json()); 
} 



function Menu (){
    
    return(
        <div className="Menu">
            <header>
                <h1>My Recipes</h1>
            </header>
            
        </div>
    )
}

export default Menu;