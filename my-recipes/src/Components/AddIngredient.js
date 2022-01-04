import React from 'react';

const AddIngredient = ({setInputText, recipes, setRecipes, inputText}) => {
    //js code
    const inputTextHandler = (e) => {
        console.log(e.target.value);
        setInputText(e.target.value);
    };
    const submitRecipeHandler = (e) => {
        e.preventDefault();

        setRecipes([
            ...recipes, {text: inputText, id: Math.random()*1000}
        ]);
        setInputText("");
    } 
    return(
        <form> 
            <input 
                onChange = {inputTextHandler} 
                type="text" 
                className="todo-input" 
                placeholder="Ingredient"
                value={inputText}
            />
            <button onClick={submitRecipeHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
        </form>

    )
};

export default AddIngredient;