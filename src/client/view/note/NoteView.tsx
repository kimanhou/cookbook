import React from 'react';
import Note from '../../../common/model/Note';
import NoteController from '../../business/controller/NoteController';

interface INoteViewProps{
    note : Note;
    deleteNote : () => void;
}

const NoteView : React.FC<INoteViewProps> = props => {
    const onDelete = () => {
        NoteController.delete(props.note)
            .then(props.deleteNote);
    }
    return (
        <div>
            {props.note.text}
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}
export default NoteView;