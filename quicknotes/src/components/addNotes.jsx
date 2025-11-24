import { useState } from "react";
import "../App.css";
let nextId = 101; 

export default function AddNotes({ notes, setNotes }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [success, setSuccess] = useState(false);

    function addNote(e) {
        e.preventDefault();
        const newNote = { id: nextId++, title, body };
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(newNote)
        })
            .then(res => res.json())
            .then(data => {
                setNotes([...notes, newNote]); 
                setSuccess(true);
                setTitle("");
                setBody("");
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="add-form">
            <div className="notes">
                {success && <p className="success-msg">Note added successfully!</p>}
                <form className="notes-form" onSubmit={addNote}>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea value={body} onChange={e => setBody(e.target.value)}></textarea>
                    <button type="submit">Add Note</button>
                </form>
            </div>
        </div>
    )
}
