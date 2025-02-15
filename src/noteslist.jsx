import { useState, useEffect } from "react";
import axios from "axios";
import Notes from "./notes";

function NotesList() {
    const [text, setText] = useState("");
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token not found");

            const response = await axios.get("https://fidi-backend-xs2o.onrender.com/notes", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error.response?.data);
            alert(error.response?.data?.msg || "Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return alert("Note cannot be empty");

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token not found in local storage");

            await axios.post("https://fidi-backend-xs2o.onrender.com/notes", { text }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setText("");
            fetchNotes();
        } catch (error) {
            console.error("Error creating note:", error.response?.data);
            alert(error.response?.data?.msg || "Failed to create note");
        }
    };

    const handleDelete = async (noteId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No authorization token");

            await axios.delete(`https://fidi-backend-xs2o.onrender.com/notes/${noteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        } catch (error) {
            console.error("Error deleting note:", error.response?.data || error.message);
            alert(error.response?.data?.msg || "Failed to delete note");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto shadow-lg rounded-xl">
            <div className="text-black">
                <form className="form-floating mb-2 d-flex gap-2" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control text-black"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add notes"
                    />
                    <label htmlFor="floatingPassword">Add notes</label>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

            <div className="p-4 max-w-md mx-auto shadow-lg rounded-xl">
                <h2 className="mb-4">Notes</h2>
                {loading ? <p>Loading notes...</p> : (
                    <ul>
                        {notes.map((note) => (
                            <Notes 
                                key={note.id} 
                                id={note.id} 
                                text={note.text} 
                                handleDelete={() => handleDelete(note.id)}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default NotesList;
