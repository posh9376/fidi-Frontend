import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./header";
import add from './assets/add-circle-svgrepo-com.svg';
import notebook from './assets/note-svgrepo-com.svg';
import tasks from './assets/task-list-svgrepo-com.svg';
import login from './assets/login-svgrepo-com (3).svg';
import Mainpage from './mainpage';
import NavItems from "./navItems";
import Login from "./login";
import CreateTodo from "./createTodo";
import NotesList from "./noteslist";
import Signup from "./signup";

function Homepage() {
    const navigate = useNavigate();
    const [hasAccount, setHasAccount] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    // Listen for changes in localStorage (e.g., login/logout from another tab)
    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
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
                        <Route path="/login" element={isLoggedIn ? <Mainpage /> : hasAccount ? (
                                <Login setIsLoggedIn={setIsLoggedIn} setHasAccount={setHasAccount} />
                            ) : (
                                <Signup setHasAccount={setHasAccount} />
                            )} />
                        <Route path="/todoos" element={
                            isLoggedIn ? (
                                <Mainpage />
                            ) : hasAccount ? (
                                <Login setIsLoggedIn={setIsLoggedIn} setHasAccount={setHasAccount} />
                            ) : (
                                <Signup setHasAccount={setHasAccount} />
                            )
                        } />
                        <Route path="/signup" element={isLoggedIn ? <Mainpage /> : <Signup setHasAccount={setHasAccount} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
