import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const linkStyle = (path) => {
        return location.pathname === path
            ? 'text-white dark:text-white bg-red-500'
            : 'text-gray-900 dark:text-black';
    };

    const logout = () => {
        sessionStorage.removeItem("data")
        window.location.reload()
    }

    return (

        <>


            <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
                <div class="px-3 py-3 lg:px-5 lg:pl-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span class="sr-only">Open sidebar</span>
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a  class="flex ms-2 md:me-24">
                                {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" /> */}
                                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-red-600">DHARM GEMS</span>
                            </a>


                        </div>
                        <div class="flex items-center">
                            <div class="flex items-center ms-3">
                                {/* <div>
                                    <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span class="sr-only">Open user menu</span>
                                        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                    </button>

                                </div> */}
                                <div className="flex items-center ms-3">
                                    <p className='mr-2 font-semibold cursor-pointer' onClick={logout}>Logout</p>
                                    <i className="pi pi-sign-in cursor-pointer font-semibold" onClick={logout}></i>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-white dark:border-gray-300" aria-label="Sidebar">
                <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-white">
                    <ul class="space-y-2 font-medium">
                        <li>
                            <Link to={'/'} class={`flex items-center  ${linkStyle('/')} p-2 text-gray-900 rounded-lg   hover:bg-red-500 hover:text-white group`}>

                                <span class="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <details>
                                <summary class="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group  text-black hover:bg-red-500 hover:text-white cursor-pointer">
                                    <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">income</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </summary>
                                <ul class="py-2 space-y-2">
                                    <li>
                                        <Link to={'/addEntryincome'} href="#" class={`flex items-center  ${linkStyle('/addEntryincome')} w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:hover:bg-red-500 hover:text-white`}>Add Entry</Link>
                                    </li>
                                    <li>
                                        <Link to={'/showEntryincome'} href="#" class={`flex  ${linkStyle('/showEntryincome')} items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group dark:hover:bg-red-500 hover:text-white`}>Show Entry</Link>
                                    </li>

                                </ul>
                            </details>
                        </li>

                        <li>
                            <details>
                                <summary class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group  hover:bg-red-500 hover:text-white cursor-pointer">
                                    <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Outgoing</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </summary>
                                <ul class="py-2 space-y-2">
                                    <li>
                                        <Link to={'/addEntryoutgoing'} href="#" class={`flex items-center  ${linkStyle('/addEntryoutgoing')} w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-red-500 hover:text-white`}>Add Entry</Link>
                                    </li>
                                    <li>
                                        <Link to={'/showEntryoutgoing'} href="#" class={`flex  ${linkStyle('/showEntryoutgoing')} items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-red-500 hover:text-white`}>Show Entry</Link>
                                    </li>

                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group  hover:bg-red-500 hover:text-white cursor-pointer">
                                    <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Broker</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </summary>
                                <ul class="py-2 space-y-2">
                                    <li>
                                        <Link to={'/addbroker'} href="#" class={`flex ${linkStyle('/addbroker')} items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group  hover:bg-red-500 hover:text-white`}>Add Broker</Link>
                                    </li>
                                    <li>
                                        <Link to={'/getbroker'} href="#" class={`flex ${linkStyle('/getbroker')}  items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group  hover:bg-red-500 hover:text-white`}>Get Broker</Link>
                                    </li>

                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-red-500 hover:text-white cursor-pointer">
                                    <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Expanse</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </summary>
                                <ul class="py-2 space-y-2">
                                    <li>
                                        <Link to={'/addexpanse'} href="#" class={`flex ${linkStyle('/addexpanse')}  items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-red-500 hover:text-white`}>Add Expanse</Link>
                                    </li>
                                    <li>
                                        <Link to={'/getexpanse'} href="#" class={`flex ${linkStyle('/getexpanse')} items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-red-500 hover:text-white`}>Get Expanse</Link>
                                    </li>

                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </aside>



        </>
    );
};

export default Navbar;
