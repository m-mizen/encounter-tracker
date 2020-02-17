import React, { useState, useRef, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import './EditableInput.css';

export const EditableInput = ({label, value, valueType, updated, placeholder, tooltip}) => {
    const [ valueEditable, updateValueEditable ] = useState(value);
    const [ editing, updateEditing ] = useState(false);
    const inputRef = useRef(null);

    const handleChange = event => {
        updateValueEditable(event.target.value);
    }
    
    const handleBlur = _ => {
        if (valueEditable !== value) {
            switch (valueType) {
                case 'number':
                    updated(Number(valueEditable));
                    break;
                default:
                    updated(valueEditable);
            }
        }
        updateEditing(false);
    }

    const handleFocus = _ => {
        updateEditing(true);
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter'){
            event.target.blur();
        }
    }

    const usePlaceholder = (!value && placeholder);

    useEffect(()=>{
        if (editing){
            requestAnimationFrame(()=>{
                inputRef.current.focus();
                inputRef.current.select();
            });
        }
    }, [editing]);

    return (
        <label className="editable_item">
            <span 
                className="label"
                onClick={ () => updateEditing(true) } 
            >{ label }</span>
            <Tooltip 
                title={ tooltip ? label : '' } 
                aria-label={ tooltip ? label : '' }
            >
            { editing ?
                <input 
                    className={
                        "Combatant__Name__input " + 
                        (editing ? 'Combatant__Name__input--editing' : '')
                    }
                    type="text" 
                    name="name" 
                    ref={ inputRef }
                    value={ valueEditable }
                    onBlur={ handleBlur }
                    onChange={ handleChange }
                    onKeyDown={ handleKeyDown } 
                /> 
                :
                <span 
                    className={
                        "unfocused " +
                        ( usePlaceholder ? "unfocused--placeholder" : '' )
                    }
                    tabIndex="0" 
                    onFocus={ handleFocus }
                >
                    { usePlaceholder ? placeholder : value }
                </span>
            }
            </Tooltip>
        </label>
    );
}