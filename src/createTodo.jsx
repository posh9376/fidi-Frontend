import { useState } from "react"
// import logo from './assets/logo5.png'
import axios from "axios";

function CreateTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [done, setDone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = done.replace("T", " ") + ":00"; // Convert to "YYYY-MM-DD HH:MM:SS"
        const body={
            title: title,
            description: description,
            done_by: formattedDate
        }
        console.log(body);
        
        
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token not found in local storage");
            const response = await axios.post("https://fidi-backend-xs2o.onrender.com/todos", body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error creating todo:", error.response?.data);
            let message = error.response?.data?.msg;
            alert(message);
        }
        setDescription('');
        setTitle('');
        setDone('');
    };

    return (
        <div className="d-flex align-items-center h-80 py-4 bg-outline-secondary text-center text-black">
            <main className="form-signin w-50 m-auto">
                {/* <img className="mb-4 logo-img" src={logo} alt="logo image" width="72" height="57" /> */}
                <h1 className="text-white">Create Todo</h1>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" placeholder="Title" />
                        <label htmlFor="floatingtitle" className="form-label">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" placeholder="Description"/>
                        <label htmlFor="floating description" className="form-label">Description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="datetime-local" value={done} onChange={(e) => setDone(e.target.value)} className="form-control" id="remainingTime" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>

            </main>
        </div>
    )
}

export default CreateTodo