import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from './../../hooks/useForm';
import { activeNote, startDeleting } from './../../actions/notes';

export const NoteScreen = () => {

    const { active: noteActive} = useSelector(state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm(noteActive);
    const { body, title } = formValues;
    const dispatch = useDispatch();
    const activeId = useRef( noteActive.id );

    useEffect(() => {
        
        if( activeId.current !== noteActive.id ) {
            reset( noteActive );
            activeId.current = noteActive.id;
        }


    }, [ noteActive, reset ])


    useEffect(() => {       
        dispatch( activeNote( formValues.id, { ...formValues } ) );
    }, [ formValues, useDispatch ]);


    const handleDelete = () => {
        dispatch( startDeleting(noteActive.id) );
    }

    return (
        <div className="notes_main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input  
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="none"
                    onChange={ handleInputChange }
                    value={ title }
                />

                <textarea
                    name="body"
                    placeholder="What happened today"
                    className="notes__textarea"
                    onChange={ handleInputChange }
                    value={ body }
                ></textarea>

                {
                    (noteActive.url) && 
                    (
                        <div className="notes__img">
                            <img 
                                src={ noteActive.url}
                                alt="imagen"

                            />
                        </div>
                    )
                }

            </div>

            <button className="btn btn-danger" onClick={ handleDelete } >
                Delete
            </button>
        </div>
    )
}
