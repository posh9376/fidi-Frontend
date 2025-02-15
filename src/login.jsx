/* eslint-disable react/prop-types */
// import logo from './assets/logo5.png';
import { useState } from 'react';
import axios from 'axios';

function Login({setIsLoggedIn}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErrorClass, setPasswordErrorClass] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!email || !password) {
            setPasswordErrorClass('error');
            alert('Please enter email and password');
            return; // Stop execution
        }

        console.log("Logging in with:", email, password);

        try {
            const response = await axios.post(
                'https://fidi-backend-xs2o.onrender.com/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = response.data;
            console.log('Login successful:', data);

            // Store token and user data
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('name', data.user.name);
            alert("Login successful. Welcome, " + data.user.name + "!");

            setIsLoggedIn(true);

        } catch (error) {
            console.error('Login failed', error.response?.data);
            let message = error.response?.data?.message;
            if (error.response?.data?.message?.includes("Invalid password")) {
                setPasswordErrorClass('error');
                alert("Invalid password. Please try again.");
            }
            alert(message);
        }
    };

    return (
        <div className="d-flex align-items-center py-4 bg-outline-secondary">
            <main className="form-signin w-30 m-auto">
                <h3>Welcome to FIDI</h3>
                <p>A Task Management App</p>
                <form onSubmit={handleSubmit}>
                    {/* <img className="mb-4 logo-img" src={logo} alt="Logo" width="72" height="57" /> */}
                    <h1 className="h3 mb-3 fw-normal">Please Login to continue</h1>

                    {/* Email Field */}
                    <div className="form-floating mb-2">
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            id="floatingInput" 
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    {/* Password Field with Show/Hide Button */}
                    <div className="form-floating mb-2 position-relative">
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            className={`form-control ${passwordErrorClass}`} 
                            value={password} 
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordErrorClass(''); // Remove error on typing
                            }}
                            id="floatingPassword" 
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        
                        {/* Show/Hide Password Button */}
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-2" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {/* Remember Me */}
                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
                    </div>

                    {/* Submit Button */}
                    <button className="btn btn-primary w-100 py-2 mb-2" type="submit">Sign in</button>

                    {/* Signup Link */}
                    <p className='text-light'>Don't have an account? <a href="/signup">Sign up</a></p>
                    <p className="mt-5 mb-3 text-body-secondary">© 2025</p>
                </form>
            </main>
        </div>
    );
}

export default Login;
