import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import Dashboard from './Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css'
import {Provider} from 'mobx-react';
import Store from './Store';
class Index extends Component
{
    render(){
        return (
        <Provider {...Store}>
            <BrowserRouter>
                <Route><Dashboard/></Route>
            </BrowserRouter>
        </Provider>
        )
    }
}
ReactDOM.render(<Index/>,document.getElementById('index'))