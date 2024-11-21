import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = ({ setFirst }) => {

    const [formData, setFormData] = useState({ login_id: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            axios.post('https://diamond-be.onrender.com/api/v1/user/login', formData)
                .then((res) => {
                    if (res == 200 || 201) {
                        toast.success("Login Success")
                        navigate('/')
                        sessionStorage.setItem("data", res.data.token)
                        setFirst(res.data.token);
                    }
                    setFormData({ login_id: '', password: '' });
                })
                .catch((err) => {
                    alert('Error adding broker: ' + (err.response ? err.response.data.message : err.message));
                });
        } catch (err) {
            toast.error(err)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div>
            <ToastContainer position="top-right" />
            <section class="flex flex-col md:flex-row h-screen items-center">

                <div class="bg-blue-600  lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                    <img src="https://img.freepik.com/premium-photo/hand-holding-diamond-wireframe-style-blue-background_193066-15448.jpg" alt="" class="w-full h-full object-cover" />
                </div>

                <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center">

                    <div class="w-full h-100">

                        <h1 class="text-2xl font-bold ">DHARM GEMS</h1>

                        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

                        <form class="mt-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <div>
                                <label class="block text-gray-700">Email Address</label>
                                <input type="text" name="login_id" id="" value={formData.login_id}
                                    onChange={handleChange} placeholder="Enter Email Address" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required />
                            </div>

                            <div class="mt-4">
                                <label class="block text-gray-700">Password</label>
                                <input type="password" value={formData.password}
                                    required
                                    onChange={handleChange} name="password" id="" placeholder="Enter Password" minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"  />
                            </div>

                            <div class="text-right mt-2">
                                <a href="#" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
                            </div>

                            <button type="submit" class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6">Log In</button>
                        </form>

                        <hr class="my-6 border-gray-300 w-full" />




                    </div>
                </div>

            </section>
        </div>
    )
}

export default Login
