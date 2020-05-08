import React from 'react';

import RegistrationPage from 'views/Auth/AuthPages/Registration';
import LoginPage from 'views/Auth/AuthPages/Login';
import Verify from 'views/Auth/AuthPages/VerificationCode';
import HomePage from 'views/Home/HomePage'
//Routing
import { Switch, Route, Link} from 'react-router-dom';


 const Authentication = () => {

    const [usuario, setUsuario] = React.useState({
        username: "",
        email: "",
        password: "",
        phone_number: "+",
        code: "",
        user: null // Este objeto contendra los datos del usuario cuando inicie sesion
    });

    const [page, setPage] = React.useState("SignUp");

    const handleFormInput = e => {
        setUsuario({
            ...usuario,
            [e.target.id] : e.target.value
        });
        console.log(usuario.username);
        console.log(usuario.email);
    }

    return(
        <Switch>
               <Route path="/login">
                    <LoginPage
                        inputs={usuario} 
                        handleFormInput={handleFormInput}  />
               </Route>
               <Route path="/register">
                    <RegistrationPage
                        inputs={usuario}
                        handleFormInput={handleFormInput}  />
               </Route>
               <Route path="/verify">
                     <Verify 
                        inputs={usuario}
                        handleFormInput={handleFormInput} />
               </Route>
               <Route path="/home">
                      <HomePage />
               </Route>
               <Route path="/">
                    <RegistrationPage
                        inputs={usuario}
                        handleFormInput={handleFormInput}  />
               </Route>
        </Switch>
    );
}

export default Authentication;