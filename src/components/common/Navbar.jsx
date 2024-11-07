import React, { useState, useEffect } from 'react'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
// import Logo from '../../assets/Logo/Logo-Full-Light.png'; 
import Logo from '../../assets/Logo/Ede-removebg-preview.png'; 
// import Logo from '../../assets/Logo/Ede-Techy.png'; 
import { GiMedusaHead } from "react-icons/gi";

import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropdown from '../core/Auth/ProfileDropdown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async () => {

        try {

            const result = await apiConnector('GET', categories.CATEGORIES_API);
            setSubLinks(result.data.allCategories);

        } catch (err) {

            console.log("Error in getting categories sublinks : ", err.message);
        }
    }

    useEffect(() => {

        fetchSubLinks();
    }, [])

    const location = useLocation();

    const matchRoute = (route) => {

        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className="flex h-14 items-center border-b-[1px] border-b-richblack-700" >
            <div className="flex w-11/12 items-center mx-auto justify-between max-w-maxContent" >
                {/* Logo */}
                <NavLink to="/">
                    {/* <img className="text-white bg-richblack-100 rounded-full border border-yellow-50" src={Logo} width={105} height={40} loading='lazy' alt="" /> */}
                    <div className="flex flex-row items-center gap-2">
                    <GiMedusaHead className="text-yellow-50 text-4xl" />
                    <p className="text-3xl font-mono text-blue-5">EdeTechy</p>
                    </div>
                </NavLink>

                {/* Nav */}
                <nav>
                    <ul className="flex gap-6 text-richblack-25">
                        {NavbarLinks.map((value, index) => (
                            <li key={index}>

                                {value.title === 'Catalog' ? (

                                    <div className="flex flex-row items-center gap-1 group relative" >
                                        <p>Catalog</p>
                                        <span><IoIosArrowDropdownCircle /></span>

                                        <div className="invisible absolute opacity-0 left-[73%] top-[90%] translate-y-[10%] h-6 w-6 bg-richblack-5 rounded rotate-45
                                              group-hover:visible group-hover:opacity-100 transition-all duration-200
                                              hover:visible hover:opacity-100 " >
                                        </div>
                                        <div className="invisible absolute translate-x-[-50%] translate-y-[15%] top-[50%] left-[50%] flex flex-col rounded-md 
                                          bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 
                                            group-hover:visible hover:visible hover:flex z-10 hover:opacity-100 group-hover-flex group-hover:opacity-100 w-[230px] p-2">
                                            {
                                                subLinks.length > 0 ? (

                                                    subLinks.map((value, index) => (

                                                        <NavLink className="hover:text-yellow-25 hover:bg-richblack-700  px-2 py-3 rounded-md font-mono " to={`/catalog/${encodeURIComponent(value.name)}`} key={index} >
                                                            {value.name}
                                                        </NavLink>
                                                    ))

                                                ) : (
                                                    <div></div>
                                                )
                                            }

                                        </div>
                                    </div>
                                )
                                    : (

                                        <NavLink to={value?.path}>
                                            <p className={`${matchRoute(value?.path) ? 'text-yellow-25' : 'text-richblack-25'}`} > {value.title}</p>
                                        </NavLink>
                                    )}

                            </li>
                        ))}

                    </ul>
                </nav>

                {/* login/Signup/Dashboard  */}
                <div className="flex gap-4 items-center text-richblack-25">
                    {/* TODO : Add Styling in this cart */}
                    {
                        user && user.accountType != "Instructor" && (

                            <NavLink to="dashboard/cart" className="relative">
                                <CiShoppingCart className="text-richblack-100 text-2xl" />
                                {
                                    totalItems > 0 &&
                                    (
                                        <span
                                            className="absolute -bottom-2 -right-2 h-5 w-5 flex justify-center items-center text-sm rounded-full text-yellow-50  bg-richblack-600"
                                        >{totalItems}</span>
                                    )
                                }
                            </NavLink>
                        )
                    }
                    {

                        token === null &&
                        (
                            <NavLink to="/login" >
                                <button className="border border-richblack-700 bg-richblack-700 px-2 py-1 hover:scale-95 transition-all duration-200 rounded-md">
                                    Login
                                </button>
                            </NavLink>

                        )
                    }
                    {

                        token === null &&
                        (
                            <NavLink to="/signup" >
                                <button className="border border-richblack-700 bg-richblack-700 px-2 py-1 hover:scale-95 transition-all duration-200 rounded-md">
                                    Signup
                                </button>
                            </NavLink>
                        )
                    }
                    {
                        token !== null &&
                        (
                            <ProfileDropdown />
                        )

                    }
                </div>
            </div>
        </div >
    )
}

export default Navbar