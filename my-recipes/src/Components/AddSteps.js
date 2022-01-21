import React from 'react';

const AddSteps = ({setInputTextSteps, steps, setSteps, inputTextSteps}) => {
    //js code
    const inputTextHandler = (e) => {
        console.log(e.target.value);
        setInputTextSteps(e.target.value);
    };
    const submitStepsHandler = (e) => {
        e.preventDefault();

        setSteps([
            ...steps, {text: inputTextSteps, id: Math.random()*1000}
        ]);
        setInputTextSteps("");
    } 
    return(
        <form> 
            <input 
                onChange = {inputTextHandler} 
                type="text" 
                className="todo-input input-with-button" 
                placeholder="Step"
                value={inputTextSteps}
            />
            <button onClick={submitStepsHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
        </form>

    )
};

export default AddSteps;