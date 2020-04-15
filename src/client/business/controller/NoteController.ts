import Note from "../../../common/model/Note";

class NoteController {
    getAll = () => {
        return fetch("/api/notes")
            .then(response => response.json())
            .then((resultArray : any[]) => resultArray.map(Note.deserialize));
    }
    
    add = (note : Note) => {
        return fetch("/api/notes", {
                method : "POST",
                body : JSON.stringify(note),
                headers: {'Content-Type' : 'application/json'}
            })
            .then(response => response.json())
            .then(Note.deserialize);
    }

    delete = (note : Note) => {
        return fetch(`/api/notes/${note.id}`, {
                method : "DELETE"
            });
    }
}
export default new NoteController();