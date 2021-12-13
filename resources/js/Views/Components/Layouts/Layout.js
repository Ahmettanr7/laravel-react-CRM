import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthService from "../../../Services/AuthService";
const Layout = (props) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    props.AuthStore.getToken();
    
    useEffect(() => {
        const token =
            props.AuthStore.appState != null
                ? props.AuthStore.appState.user.access_token
                : null;
        let authService = new AuthService();
        authService
            .authenticate(token)
            .then((result) => {
                if (!result.data.isLoggedIn) {
                    history.push("/login");
                }
                setUser(result.data.user);
                setIsLoggedIn(result.data.isLoggedIn);
            })
            .catch((e) => {
                history.push("/login");
            });
    }, []);

    const logout = () => {
        const token =
            props.AuthStore.appState != null
                ? props.AuthStore.appState.user.access_token
                : null;
        let authService = new AuthService();
        authService
            .logout(token)
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
        props.AuthStore.removeToken();
        history.push("/login");
    };

    return (
        <>
            <Navbar style={{background:'#2f5e58'}}>
            <Container >
                <Navbar.Brand style={{color:'#fff'}} href="/">CRM</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={user.name}
                        menuVariant="dark"
                        >
                        <NavDropdown.Item href="/urunler">Ürünler</NavDropdown.Item>
                        <NavDropdown.Item href="/urunler/ekle">Yeni Ürün</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
            </Container>
            </Navbar>
            <div>{props.children}</div>
        </>
    );
};
export default inject("AuthStore")(observer(Layout));
