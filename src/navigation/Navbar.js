import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'



const Navbar = () => {

    useEffect(() => {
        const M = window.M;
        var sidenav = document.querySelectorAll(".sidenav");
        M.Sidenav.init(sidenav, {});
    }, []);

    return (
        <nav className="nav-wrapper grey darken-3">
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <div className="container">
                <a className="brand-logo">NewVibe</a>
                <ul className="right  hide-on-med-and-down">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/SignUp'>Sign Up</Link></li>
                    <li><Link to='/SignIn'>Sign In</Link></li>
                    <li><Link to='/Profile'>Profile</Link></li>
                </ul>

            </div>

            <ul className="sidenav" id="mobile-demo">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/SignUp'>Sign Up</Link></li>
                <li><Link to='/SignIn'>Sign In</Link></li>
                <li><Link to='/Profile'>Profile</Link></li>
            </ul>
        </nav>


    )
}





export default Navbar