import React from 'react';
import './Combatant.css';

import Paper from '@material-ui/core/Paper';

import { EditableInput } from '../EditableInput/EditableInput';

const Hitpoints = ({value, updated}) => {

    const updateCurrent = newValue => {
        let newCurrent;
        if ( newValue < 0 ) {
            newCurrent = 0;
        } else if ( newValue >= value.max ) {
            newCurrent = value.max;
        } else {
            newCurrent = newValue;
        }
        value = {
            ...value,
            current: newCurrent
        }
        updated(value);
    }

    const updateMax = newValue => {
        const newMax = newValue < 1 ? 1 : newValue;
        const newCurrent = value.current > newMax ? newMax : value.current;
        value = {
            current: newCurrent,
            max: newMax
        }
        updated(value);
    }
    
    return (
        <div className={
            "Hitpoints " +
            ( value.current / value.max <= .5 ? 'Hitpoints--half ' : '' ) +
            ( value.current / value.max <= .25 ? 'Hitpoints--quarter ' : '' ) +
            ( value.current === 1 && value.current > 1 ? 'Hitpoints--1 ' : '' ) +
            ( value.current === 0 ? 'Hitpoints--0 ' : '' )
            }>
            <EditableInput 
                valueType="number"
                label="Current"
                value={ value.current }
                updated={ updateCurrent }
                />
            /
            <EditableInput 
                valueType="number"
                label="Max"
                value={ value.max }
                updated={ updateMax }
            />
        </div>
    );
}

export const Combatant = (props) => {

    const {
        update,
        combatant,
        children,
        active
    } = props;

    // Destructure the combatant object
    const {
        initiative,
        name,
        hp,
        characterClass,
        ac,
        effects
    } = combatant;

    // Update a property
    const updateProp = (propName) => {
        return (newValue) => {
            const combatantUpdated = {
                ...combatant
            };
            combatantUpdated[propName] = newValue;
            update(combatantUpdated);
        }
    }

    return (
        <Paper
            elevation={ active ? 2 : 0 }
        >
            <div className={ 
                "Combatant " + 
                (active ? "Combatant--active" : "")
                }
            >
                <div className="Combatant__grid">
                    <span className="Combatant__column Combatant__init">
                        <EditableInput 
                            valueType="number"
                            label="Initiative"
                            value={initiative}
                            placeholder="0"
                            tooltip={ true }
                            updated={ updateProp('initiative') }
                        />
                    </span>

                    <span className="Combatant__column Combatant__name">
                        <EditableInput 
                            value={name}
                            placeholder="Click to add a name"
                            updated={ updateProp('name') }
                        />
                        <EditableInput 
                            value={characterClass}
                            placeholder="Click to add a description"
                            updated={ updateProp('characterClass') }
                        />
                    </span>
                    
                    <span className="Combatant__column Combatant__hp">
                        <small>HP</small>
                        <Hitpoints
                            value={ hp }
                            valueType="number"
                            updated={ updateProp('hp') }
                        />
                    </span>
                    <span className="Combatant__column Combatant__ac">
                        <EditableInput
                            value={ac} 
                            valueType="number"
                            label="AC"
                            updated={ updateProp('ac') }
                        />
                    </span>

                    {/* Add Child components */}
                    

                    <span className="Combatant__row Combatant__effects">
                        { JSON.stringify(effects) }
                    </span>
                </div>
                <span className="Combatant__actions">
                    { children }
                </span>
            </div>
        </Paper>
    );
}