import React, {useState, useEffect} from 'react';

import RegistrationPage from 'views/Auth/AuthPages/Registration';
import LoginPage from 'views/Auth/AuthPages/Login';
import Verify from 'views/Auth/AuthPages/VerificationCode';
import HomePage from 'views/Home/HomePage'
import UserCurriculum from 'views/UserCurriculum/UserCurriculum';
import Categories from 'views/Categories/Categories';
//Amplify integracion Cognito
import { Auth } from "aws-amplify";
//Routing
import { Switch, Route, useHistory} from 'react-router-dom';



 const Authentication = () => {

    const history = useHistory(); //routing con programacion sin Link

    const [usuario, setUsuario] = useState({
        username: "",
        email: "",
        password: "",
        phone_number: "+",
        code: "",
        user: null // Este objeto contendra los datos del usuario cuando inicie sesion
    });

    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: true
        })
        .then( data => {
            let user = {username:data.username, ...data.attributes}
            console.log(user)
            if(user.email_verified){
                setUsuario({
                    user
                })
            }
        })
        .catch(err => console.log(err))
    },[])

    const checkUser = () => {
        console.log("INFO de SESSION");
        Auth.currentAuthenticatedUser()
        .then(user => {
            console.log("USUARIO", usuario)
            console.log({ user })
        })
        .catch(err => console.log(err))
    }

    const signOut = () => {
        console.log("SALIENDO de SESSION");
        Auth.signOut()
        .then(data => {
            console.log(data)
            history.push("/login")
        })
        .catch(err => console.log(err))
    }

    const handleFormInput = e => {
        setUsuario({
            ...usuario,
            [e.target.id] : e.target.value
        });
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
                      <HomePage
                      checkUser={checkUser}
                      signOut={signOut}
                       />
               </Route>
               <Route path="/curriculum">
                      <UserCurriculum 
                      checkUser={checkUser}
                      signOut={signOut}
                      usuario={usuario}
                      />
               </Route>
               <Route path="/categories">
                      <Categories 
                      checkUser={checkUser}
                      signOut={signOut}
                      usuario={usuario}
                      />
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