import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Home from './Views/Home/Home';
import Login from './Views/Login/Login';
import Register from './Views/Register/Register';
/*Sayfalar */

export default function Dashboard() {
    return (
        <>
        <Route exact path={'/'}><Home/></Route>
        <Route path={'/login'}><Login/></Route>
        <Route path={'/register'}><Register/></Route>
        </>
    )
}
