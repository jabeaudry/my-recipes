import React from 'react';

const LinkPicker = ({recipeLink, setRecipeLink}) => {
    //js code
    const linkTextHandler = (e) => {
        console.log(e.target.value);
        setRecipeLink(e.target.value);
    };
    
    return(
        <form> 
            <input 
                onChange = {linkTextHandler} 
                type="text" 
                className="todo-input" 
                placeholder="Recipe link (optional)"
                value={recipeLink}
            />
        </form>

    )
};

export default LinkPicker;