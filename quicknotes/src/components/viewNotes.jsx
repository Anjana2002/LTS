import { useState } from "react";
import "../App.css";

export default function ViewNotes({ notes, setNotes }) {
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");

    const handleEditClick = (note) => {
        setEditId(note.id);
        setEditTitle(note.title);
        setEditBody(note.body);
    };

    const handleSaveClick = (note) => {
        if (note.id <= 100) { 
            fetch(`https://jsonplaceholder.typicode.com/posts/${note.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ title: editTitle, body: editBody })
            })
            .then(res => res.json())
            .then(data => {
                const updatedNotes = notes.map(n =>
                    n.id === note.id ? { ...n, ...data } : n
                );
                setNotes(updatedNotes);
                setEditId(null);
            })
            .catch(err => console.error(err));
        } else {
            const updatedNotes = notes.map(n =>
                n.id === note.id ? { ...n, title: editTitle, body: editBody } : n
            );
            setNotes(updatedNotes);
            setEditId(null);
        }
    };

    const handleDeleteClick = (note) =>{
        if (note.id <= 100) { 
            fetch(`https://jsonplaceholder.typicode.com/posts/${note.id}`, {
                method: "DELETE"
            })
            .then(() => {
                    setNotes(notes.filter(n => n.id !== note.id));
                
            })
            .catch(err => console.error(err));
        } else {
            setNotes(notes.filter(n => n.id !== note.id));
        }
    };

    const handleCancelClick = () => setEditId(null);

    return (
        <div className="notes-table-container">
            <h2>All Notes</h2>
            <table className="notes-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map(note => (
                        <tr key={note.id}>
                            <td>{note.id}</td>
                            <td>
                                {editId === note.id ? (
                                    <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                                ) : note.title}
                            </td>
                            <td>
                                {editId === note.id ? (
                                    <input value={editBody} onChange={e => setEditBody(e.target.value)} />
                                ) : note.body}
                            </td>
                            <td>
                                {editId === note.id ? (
                                    <>
                                        <button onClick={() => handleSaveClick(note)} className="btn">Save</button>
                                        <button onClick={handleCancelClick} className="btn">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                    <button onClick={() => handleEditClick(note)} className="btn">Edit</button>
                                    <button onClick={() => handleDeleteClick(note)} className="btn">Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
