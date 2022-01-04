import React from 'react';

const TitlePicker = ({recipeTitle, setRecipeTitle}) => {
    //js code
    const titleTextHandler = (e) => {
        console.log(e.target.value);
        setRecipeTitle(e.target.value);
    };
    
    return(
        <form> 
            <input 
                onChange = {titleTextHandler} 
                type="text" 
                className="todo-input" 
                placeholder="Recipe name"
                value={recipeTitle}
            />
        </form>

    )
};

export default TitlePicker;