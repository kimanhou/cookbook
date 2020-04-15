import React, { useState, useEffect } from 'react';
import Note from '../../../common/model/Note';
import NoteView from './NoteView';
import NewNoteView from './NewNoteView';

interface INoteListViewProps{
    notes : Note[];
}

const NoteListView : React.FC<INoteListViewProps> = props => {
    const [notes, setNotes] = useState(props.notes.slice());
    useEffect(() => {
        setNotes(props.notes.slice());
    }, [props.notes]);
    const addNote = (note : Note) => {
        setNotes(notes => [...notes, note]);
    }
    const deleteNote = (note : Note) => {
        setNotes(notes => notes.filter(n => n.id !== note.id));
    }
    return (
        <div>
            {notes.map(note => 
                <NoteView key={`${note.id}`} note={note} deleteNote={() => deleteNote(note)}/>
            )}
            <NewNoteView addNote={addNote} />
        </div>
    )
}
export default NoteListView;