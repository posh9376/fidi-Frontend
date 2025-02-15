import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./header";
import add from './assets/add-circle-svgrepo-com.svg';
import notebook from './assets/note-svgrepo-com.svg';
import tasks from './assets/task-list-svgrepo-com.svg'
import login from './assets/login-svgrepo-com (3).svg'
import Mainpage from './mainpage';
import NavItems from "./navItems";
import Login from "./login";
import CreateTodo from "./createTodo";
import NotesList from "./noteslist";
import Signup from "./signup";

function Homepage() {
    const navigate = useNavigate();
    
    // Check login status from local storage
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token")); // Update state if local storage changes
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        setIsLoggedIn(false);
        navigate("/login"); // Redirect to login page
    };

    return (
        <div>
            <div className="d-flex gap-2" style={{ height: "100vh" }}>
                <div className="left-div">
                    <Link to='/todoos'><NavItems src={tasks} text="Tasks" /></Link>
                    <Link to='/todos'><NavItems src={add} text="Add Task" /></Link>
                    <Link to='/notes'><NavItems src={notebook} text="Notebook" /></Link>
                    
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="btn btn-danger mt-2">
                            Logout
                        </button>
                    ) : (
                        <Link to='/login'><NavItems src={login} text="Login" /></Link>
                    )}
                </div>

                <div className="right-div">
                    <Header />
                    <Routes>
                        <Route path="/todos" element={isLoggedIn ? <CreateTodo /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/notes" element={isLoggedIn ? <NotesList /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/login" element={isLoggedIn ? <Mainpage /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/todoos" element={isLoggedIn ? <Mainpage /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/signup" element={isLoggedIn ? <Mainpage /> : <Signup />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
