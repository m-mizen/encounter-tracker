import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import { Combatant } from '../Combatant/Combatant';
import { generateID } from '../../utils';

import './Combat.css';
  
const sortInit = (a, b) => {
    if (a.initiative < b.initiative){
        return 1;
    }
    if (a.initiative > b.initiative){
        return -1;
    }
    return 0;
}

export const Combat = () => {

    const [ combatants, updateCombatants ] = useState([]);

    const [ notes, updateNotes ] = useState('');

    const [ active, updateActive ] = useState(0);

    const nextInititive = () => {
        if (!combatants || combatants.length < 1){
            return;
        }
        const newActive = active + 1;
        if (newActive >= combatants.length){
            updateActive(0);
            return;
        }
        updateActive(newActive);
    }

    const prevInititive = () => {
        if (!combatants || combatants.length < 1){
            return;
        }
        const newActive = active - 1;
        if (newActive < 0 ){
            updateActive(combatants.length - 1);
            return;
        }
        updateActive(newActive);
    }

    const addCombatant = () => {
        updateCombatants([
            ...combatants,
            {
                id: generateID(),
                name: '',
                initiative: 1,
                hp: {
                    max: 1,
                    current: 1,
                },
                ac: 10,
                effects: {
                    concentration: false,
                    blinded: false,
                    deaf: false,
                    unconcious: false,
                    suprised: false,
                    charmed: false,
                },
            }
        ]);
    }

    const deleteCombatant = indexToRemove => {
        updateCombatants(
            combatants.filter((_, index) => index !== indexToRemove)
        );
    }

    const updateCombatant = index => {
        return (newValue) => {
            const combatantsUpdated = [
                ...combatants,
            ];
            combatantsUpdated[index] = newValue;
            updateCombatants(combatantsUpdated);
        }
    }

    const sortByInitiative = () => {
        const updated = [...combatants].sort(sortInit);
        updateCombatants(updated);
    }

    const listItems = () => {
        return combatants.map((combatant, index) => (
            <li key={ combatant.id }>
                <Combatant
                    combatant={ combatant }
                    update={ updateCombatant(index) }
                    active={ index === active }
                >
                    <Tooltip placement="right" title="Delete" aria-label="Delete">
                        <IconButton 
                            size="small"
                            color="secondary" 
                            onClick={ _ => deleteCombatant(index) } 
                            aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip placement="right" title="Make active" aria-label="Make active">
                        <IconButton
                            size="small"
                            color="primary" 
                            onClick={ _ => updateActive(index) } 
                            >
                            <PlayCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </Combatant>
            </li>
        ));
    }

    const undo = () => {
        console.log("undo ?");
    }

    useEffect(()=>{
        console.log(combatants);
    }, [combatants]);

    return (
        <article className="Combat">

            <header className="Combat__title">
                <h1 >Combat Title</h1>
            </header>

            <section className="Combat__main">
                <ul className="Combat__list">{ listItems() }</ul>
            </section>

            <aside className="Combat__controls">
                <div className="sticky-inner">
                    <h2>Controls</h2>

                    <ButtonGroup variant="contained" color="primary" aria-label="Combat controls">
                        <Button onClick={ _ => prevInititive() } >Prev</Button>
                        <Button onClick={ _ => nextInititive() } >Next</Button>
                    </ButtonGroup>

                    <p>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={ _ => sortByInitiative() } 
                        >Sort</Button>
                    </p>

                    <p>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={ _ => undo() } 
                        >Undo</Button>
                    </p>

                    <h3>Add New</h3>
                    <div>
                        == filerable scrollable list with saved items on it ==
                        <Button onClick={ _ => addCombatant() } >Add New</Button>
                    </div>
                </div>
            </aside>

            <aside className="Combat__notes">
                <div className="sticky-inner">
                    <h2>Notes</h2>
                    <textarea onChange={ e => updateNotes(e) }>
                        { notes }
                    </textarea>
                </div>
            </aside>
        </article>
    );
}