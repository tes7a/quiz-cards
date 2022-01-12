import React from "react";
import {Link, Navigate, NavLink } from "react-router-dom";

export const Profile = () => {
    return <>
        <div><Link to={'/'}>Profile</Link></div>
        <div><Link to={'/test'}>Test</Link></div>
        <div><Link to={'/login'}>Login</Link></div>
        <div><Link to={'/signin'}>Signin</Link></div>
        <div><Link to={'/passrecovery'}>PassRec</Link></div>
        <div><Link to={'/registration'}>Reg</Link></div>
        <div><Link to={'/404'}>404</Link></div>

        <h1>PROFILE</h1>
    </>
}