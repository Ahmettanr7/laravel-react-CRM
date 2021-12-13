import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Login from './Views/Login/Login';
import Register from './Views/Register/Register';
import Home from './Views/Home/Home';
import PrivateRoute from './PrivateRoute';
import Products from './Views/Product/Products'
import CreateProduct from './Views/Product/CreateProduct';
import EditProduct from './Views/Product/EditProduct';

export default function Dashboard() {
    return (
        <Switch>
        <PrivateRoute exact path={'/'} component={Home}></PrivateRoute>
        <Route path={'/login'} component={Login}></Route>
        <Route path={'/register'} component={Register}></Route>
        <PrivateRoute exact path={'/urunler'} component={Products}></PrivateRoute>
        <PrivateRoute exact path={'/urunler/ekle'} component={CreateProduct}></PrivateRoute>
        <PrivateRoute exact path={'/urunler/duzenle/:id'} component={EditProduct}></PrivateRoute>
        </Switch>
    )
}
