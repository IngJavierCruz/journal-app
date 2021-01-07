import { db } from "../firebase/firebase-config";
import { types } from './../types/types';
import { loadNotes } from './../helpers/loadNotes';
import  Swal from 'sweetalert2';
import { fileUpload } from './../helpers/fileUpload';

export const startNewNote = () => {

    return async( dispatch, getState) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body:'',
            date: new Date().getTime()
        };

        const docRef = await db.collection(`${ uid }/journal/notes`).add(newNote);
        dispatch( activeNote(docRef.id, newNote) );
        dispatch( addNewNote( docRef.id, newNote) );

    }


}


export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const activeNote = ( id, note ) => ({
  type: types.notesActive,
  payload: { id, ...note }  
});


export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});


export const startLoadingNotes = ( uid ) => {
    
    return async( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes(notes) );

    }

}


export const startSaveNote = (note) => {
    
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }

        const noteFirestore = { ...note };
        delete noteFirestore.id;
        
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteFirestore );

        dispatch( refreshNote(note.id, noteFirestore ));
        Swal.fire('Saved', note.title, 'success');
    }

}


export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }   
});


export const startUploading = (file) => {
    
    return async(dispatch, getState) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        dispatch( startSaveNote(activeNote) );

        Swal.close();

    }
}


export const startDeleting = (id) => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;

        await db.doc(`${ uid }/journal/notes/${ id }`).delete();
        dispatch( deleteNote(id) );
    }
}


export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});


export const noteLogout = () => ({
  type: types.notesLogoutCleaning  
})