import { inject, observer } from 'mobx-react';
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from '../Components/Layouts/Layout';
 const Home = (props) => {

    const history = useHistory();
    props.AuthStore.getToken();
    return (
        <Layout>Home</Layout>
    )
};
export default inject("AuthStore")(observer(Home));
