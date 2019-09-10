import React from 'react'

function MyInput(props) {
    console.log("textField");
    return (
        <div className="form__group">
            <input 
                type={props.type} 
                className="form__input" 
                placeholder={props.placeholder} 
                name={props.name}
                value={props.value}
                onChange={props.onChange} 
                required={props.required} />
            <label htmlFor="name" className="form__label">{props.text}</label>
        </div>
    )
}



export default React.memo(MyInput)
