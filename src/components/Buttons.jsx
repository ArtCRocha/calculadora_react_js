import React from "react";
import './Buttons.css'

const Buttons = (props) => {

    let classes = "button "
    classes += props.operations ? "operations" : ""
    classes += props.double ? "double" : ""
    classes += props.triple ? "triple" : ""

    return (
        <button
            onClick={e => props.click(e.target.innerHTML)}
            className={classes}>
            {props.label}
        </button>
    )
}

export default Buttons;