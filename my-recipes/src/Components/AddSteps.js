import React from 'react';

const AddSteps = ({setInputText, steps, setSteps, inputText}) => {
    //js code
    const inputTextHandler = (e) => {
        console.log(e.target.value);
        setInputText(e.target.value);
    };
    const submitStepsHandler = (e) => {
        e.preventDefault();

        setSteps([
            ...steps, {text: inputText, id: Math.random()*1000}
        ]);
        setInputText("");
    } 
    return(
        <form> 
            <input 
                onChange = {inputTextHandler} 
                type="text" 
                className="todo-input input-with-button" 
                placeholder="Step"
                value={inputText}
            />
            <button onClick={submitStepsHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
        </form>

    )
};

export default AddSteps;