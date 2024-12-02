import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setFirst }) => {
    const [formData, setFormData] = useState({ login_id: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    console.log(loading, "loading");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); 

        axios
            .post('https://diamond-be.onrender.com/api/v1/user/login', formData)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    toast.success('Login Success');
                    sessionStorage.setItem('data', res.data.token);
                    setFirst(res.data.token);
                    navigate('/');
                }
                setFormData({ login_id: '', password: '' });
            })
            .catch((err) => {
                toast.error(
                    'Error: ' + (err.response ? err.response.data.message : err.message)
                );
            })
            .finally(() => {
                setLoading(false); 
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div>
            <ToastContainer position="top-right" />
            {loading && (
                <div className="loader-container justify-center absolute z-50 w-full h-full left-0 items-center right-0 top-0  flex  bg-[#ffffff69]">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" />
                </div>
            )}
            <section className="flex flex-col md:flex-row h-screen items-center">
                {/* Left Image Section */}
                <div className="bg-blue-600 lg:block w-full md:w-1/2 xl:w-2/3 h-screen relative">
                    <img
                        src="https://img.freepik.com/premium-photo/hand-holding-diamond-wireframe-style-blue-background_193066-15448.jpg"
                        alt="Diamond"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Login Section */}
                <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                    <div className="w-full h-100">
                        <h1 className="text-2xl font-bold">DHARM GEMS</h1>
                        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
                            Log in to your account
                        </h1>

                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="login_id"
                                    value={formData.login_id}
                                    onChange={handleChange}
                                    placeholder="Enter Email Address"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    autoFocus
                                    autoComplete="on"
                                    required
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    minLength="6"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>
                        <hr className="my-6 border-gray-300 w-full" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
