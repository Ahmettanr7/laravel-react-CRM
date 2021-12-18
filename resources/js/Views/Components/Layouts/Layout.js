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
                    props.history.push("/login");
                }
                setUser(result.data.user);
                setIsLoggedIn(result.data.isLoggedIn);
            })
            .catch((e) => {
                props.history.push("/login");
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
       window.location.href = '/login';
    };

    return (
        <>
            <Navbar style={{background:'#2f5e58'}}>
            <Container >
                <Navbar.Brand style={{color:'#fff'}} href="/">CRM ADMİN</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse  className="justify-content-start text-white">
                    <Nav >
                        <NavDropdown
                        title="Ürün Yönetimi"
                        >
                        <NavDropdown.Item href="/urunler">Ürünler</NavDropdown.Item>
                        <NavDropdown.Item href="/urunler/ekle">Yeni Ürün</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav >
                        <NavDropdown
                        title="Kategori Yönetimi"
                        >
                        <NavDropdown.Item href="/kategoriler">Kategoriler</NavDropdown.Item>
                        <NavDropdown.Item href="/kategoriler/ekle">Yeni Kategori</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={user.name}
                        menuVariant="dark"
                        >
                        <NavDropdown.Item href="/">Hesap Ayarları</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Çıkış Yap</NavDropdown.Item>
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
