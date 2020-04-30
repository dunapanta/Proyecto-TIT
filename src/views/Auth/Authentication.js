import React from 'react';

import RegistrationPage from 'views/Auth/AuthPages/Registration';
import LoginPage from 'views/Auth/AuthPages/Login';
import Verify from 'views/Auth/AuthPages/VerificationCode';


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
    }

    const handlePage = (changePage) =>{
        setPage(changePage);
    }

    
        switch (page){
            case "SignUp":
                return(
                    <RegistrationPage
                        inputs={usuario}
                        handleFormInput={handleFormInput}
                        switchPage={handlePage}  
                     />
                );
            case "SignIn":
                return(
                    <LoginPage
                        inputs={usuario} 
                        handleFormInput={handleFormInput}
                        switchPage={handlePage}   
                    />
                );
            case "Verify":
                return(
                    <Verify 
                        inputs={usuario}
                        handleFormInput={handleFormInput}
                        switchPage={handlePage}  
                    />
                );
            case "Welcome":
                return(
                    <h1>Felicidades Has Iniciado Sesión</h1>
                );
            default:
                return(
                    <RegistrationPage 
                        inputs={usuario}
                        handleFormInput={handleFormInput}
                        switchPage={handlePage}
                    />
                );
        }
}

export default Authentication;