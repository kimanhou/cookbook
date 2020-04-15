import React, { useState } from 'react';
import Note from '../../../common/model/Note';
import NoteController from '../../business/controller/NoteController';

interface INewNoteViewProps{
    addNote : (note : Note) => void;
}

const NewNoteView : React.FC<INewNoteViewProps> = props => {
    const [text, setText] = useState("");
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }
    const onClick = () => {
        const note = Note.createNote(text);
        NoteController.add(note)
            .then(note => props.addNote(note))
            .then(() => setText(""));
    }
    return (
        <div>
            <textarea value={text} onChange={onChange}/>
            <button onClick={onClick}>Add</button>
        </div>
    );
}
export default NewNoteView;