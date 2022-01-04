import React from 'react';
//import component
import Ingredient from './Ingredient'

const IngredientList = ({recipes,setRecipes}) => {
    
    return(
        <div className = "todo-container">
            <ul className="todo-list">
                {recipes.map(ingredient => (
                    <Ingredient 
                        setRecipes={setRecipes} 
                        recipes={recipes} 
                        text={ingredient.text}
                        ingredient={ingredient} 
                        key={ingredient.id}
                    />
                ))}
            </ul>
        </div>
    )
};

export default IngredientList;