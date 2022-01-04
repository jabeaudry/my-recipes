import React from 'react';
import IngredientList from './IngredientList';

const Ingredient = ({text, recipes, setRecipes,ingredient}) => {
    //events
    const deleteHandler = () => {
        setRecipes(recipes.filter((el) => el.id !== ingredient.id));
    };
    return(
        <div className="todo">
            <li className="todo-item">{text}</li>
            {/* <button className = "complete-btn">
                <i className= "fas fa-arrow-down"></i>
            </button> */}
            <button  className="trash-btn" onClick={deleteHandler}>
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
}

export default Ingredient;