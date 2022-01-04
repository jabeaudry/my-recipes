import React from 'react';

const ImagePicker = ({recipeImage, setRecipeImage}) => {
    //js code
    const imageTextHandler = (e) => {
        console.log(e.target.value);
        setRecipeImage(e.target.value);
    };
    
    return(
        <form> 
            <input 
                onChange = {imageTextHandler} 
                type="text" 
                className="todo-input" 
                placeholder="Recipe image link (optional)"
                value={recipeImage}
            />
        </form>

    )
};

export default ImagePicker;