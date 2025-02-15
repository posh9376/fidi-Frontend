import { useState } from 'react';
import './styles/style.css';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
 
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordErrorClass, setPasswordErrorClass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if all fields are filled
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }

        // Validate email format
        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordErrorClass('error');
            setErrorMessage("Passwords do not match.");
            return;
        }

        // Reset error message
        setErrorMessage('');
        setPasswordErrorClass('');

        const body = { 
            name: username,
            email: email,
            password: password 
        };

        try {
            const response = await axios.post(
                'https://fidi-backend-xs2o.onrender.com/signup', 
                body,
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = response.data;
            console.log('Signup successful:', data);

            // Redirect user to login page or dashboard after signup
            alert("Signup successful! You can now log in.");
            window.location.href = "/login"; 

        } catch (error) {
            console.error('Error during signup:', error.response?.data);
            setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
        }

        // Clear input fields
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="d-flex align-items-center  py-4 bg-outline-secondary">
            <main className="form-signin w-35 m-auto text-black">

                <form onSubmit={handleSubmit}>
                    <h3 className='text-light'>Welcome to FIDI</h3>
                    <p className='text-light'>Create an account and Enjoy</p>
                    <h1 className="h3 mb-3 fw-normal">Sign up</h1>

                    {/* Error Message Display */}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <div className="form-floating mb-2">
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="form-control" 
                            id="floatingName" 
                            placeholder="Name"
                        />
                        <label htmlFor="floatingName">Name</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="form-control" 
                            id="floatingEmail" 
                            placeholder="Email" 
                        />
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>

                    {/* Password Input */}
                    <div className="form-floating mb-2 position-relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password} 
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordErrorClass('');
                            }} 
                            className={`form-control ${passwordErrorClass}`} 
                            id="floatingPassword" 
                            placeholder="Password" 
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-2" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="form-floating mb-2 position-relative">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            value={confirmPassword} 
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setPasswordErrorClass('');
                            }} 
                            className={`form-control ${passwordErrorClass}`} 
                            id="floatingConfirmPassword" 
                            placeholder="Confirm Password" 
                        />
                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-2" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <div className="form-check text-start my-3 text-light">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>

                    <button className="btn btn-primary w-100 py-2 mb-2" type="submit">Sign up</button>
                    <p className='text-light'>Already have an account? <a href="/login">Login</a></p>
                    <p className="mt-5 mb-3 text-body-secondary">© 2025</p>
                </form>
            </main>
        </div>
    );
}

export default Signup;
