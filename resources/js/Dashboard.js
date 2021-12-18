import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Login from './Views/Login/Login';
import Register from './Views/Register/Register';
import Home from './Views/Home/Home';
import PrivateRoute from './PrivateRoute';
import Products from './Views/Product/Products'
import CreateProduct from './Views/Product/CreateProduct';
import EditProduct from './Views/Product/EditProduct';
import Categories from './Views/Category/Categories';
import CreateCategory from './Views/Category/CreateCategory';
import EditCategory from './Views/Category/EditCategory';

export default function Dashboard() {
    return (
        <Switch>

        <PrivateRoute exact path={'/'} component={Home}></PrivateRoute>
        
        <Route path={'/login'} component={Login}></Route>
        <Route path={'/register'} component={Register}></Route>

        <PrivateRoute exact path={'/urunler'} component={Products}></PrivateRoute>
        <PrivateRoute  path={'/urunler/ekle'} component={CreateProduct}></PrivateRoute>
        <PrivateRoute  path={'/urunler/duzenle/:id'} component={EditProduct}></PrivateRoute>

        <PrivateRoute exact path={'/kategoriler'} component={Categories}></PrivateRoute>
        <PrivateRoute  path={'/kategoriler/ekle'} component={CreateCategory}></PrivateRoute>
        <PrivateRoute  path={'/kategoriler/duzenle/:id'} component={EditCategory}></PrivateRoute>
        </Switch>
    )
}
