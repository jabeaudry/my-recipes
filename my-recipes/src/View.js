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
    let { id } = useParams();

    const getRecipeWithIngredients = async () => {
        const response = await fetch(`http://localhost:5000/recIngr/${id}`);
        const data = await response.json();
        console.log(data);
        setRecipesIngr(data);
    }
     //hook that runs after the return function
    useEffect( () => {
        getRecipeWithIngredients();
    }, []);


    return(
        <div className="View">
            {
                recipesIngr.map((element)  => {
                    return(
                        <h1>{element.recipeName}</h1>
                    )
                })
            }

        </div>
    )
}


export default View;