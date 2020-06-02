import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "components/Header/Header.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Parallax from "components/Parallax/Parallax.js";
import Footer from "components/Footer/Footer.js";
// sections for this page
import HeaderLinksHome from "components/Header/HeaderLinksHome.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import UserAvatar from 'views/UserCurriculum/UserCurriculumSections/UserAvatar';
import Spinner from 'views/Loading/Spinner';
//AWS
import Amplify, { Auth, API } from "aws-amplify";

const styles2 = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles, styles2);

export default function UserCurriculum(props) {
  
    const {checkUser, signOut} = props
    const [userCurriculum, setUserCurriculum] = useState({
        firstName: "",
        lastName: "",
        cedula: "",
        telefono: "",
        categoria: "",
        trabajo: "",
        tarifa: "",
        ciudad: "",
        pais: "",
        postalCode: "",
        aboutMe: "",
        experiencia: "",
        user: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUserAsync()
    }, [])

    const handleCurriculumInput = e => {
        setUserCurriculum({
            ...userCurriculum,
            [e.target.id] : e.target.value
        });
    }
    
    const submitCurriculumAsync = async () => {
        await getCurrentUserAsync();
        let apiName = "tesis";
        let path = "/users";
        let data = {
            body: {
                user_id: userCurriculum.user.sub,
                ...userCurriculum
            }
        };
        console.log("Curriculum Actualizado")
        return await API.post(apiName, path, data)
    }


    const getCurrentUser = () => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then(user => {
            setUserCurriculum(userCurriculum.user = user)
            console.log("getUser",userCurriculum.user )
            console.log("getUser",userCurriculum.user.attributes.sub )
        })
       /*  getUserCurriculum(); */
    }

    const getCurrentUserAsync = async () => {
       
        let currentUser= await Auth.currentAuthenticatedUser();
        console.log("Todo",currentUser)
        let user = { username: currentUser.username, ...currentUser.attributes }
        const { attributes } = currentUser;
        console.log("Atributos desde Async", attributes)
        console.log("Email desde Async", attributes.email)
        console.log("Usuario definido por mi",user)
        setUserCurriculum(
            userCurriculum.user = user
        )
        console.log("Desde useState", userCurriculum);
        // Con este metodo obtengo los datos de dynamo y los pongo en state userCurriculum
        getUserCurriculumAsync();
        // paso a false loading
        
    }

    //Para hacer fetch
    const getUserCurriculum = () => {
        /* const {usuario} = props; */
        
        let path = `/users/23760e28-dbbd-43a7-8b4c-c9fd0c9e069d`;
        const apiName = "tesis";
        API.get(apiName, path)
        .then(response => {
            console.log("Con User ID",response[0]);
            console.log("Pin pan p",userCurriculum.user);

            setUserCurriculum(
                userCurriculum.firstName=response[0].firstName,
                //userCurriculum.loading= false,
               /*  userCurriculum.lastName=response[0].lastName,
                userCurriculum.cedula=response[0].cedula,
                userCurriculum.telefono=response[0].telefono,
                userCurriculum.categoria=response[0].categoria,
                userCurriculum.trabajo=response[0].trabajo,
                userCurriculum.tarifa=response[0].tarifa,
                userCurriculum.ciudad=response[0].ciudad,
                userCurriculum.pais=response[0].pais,
                userCurriculum.postalCode=response[0].postalCode,
                userCurriculum.aboutMe=response[0].aboutMe,
                userCurriculum.experienciaresponse[0].experiencia, */
                )
            console.log(userCurriculum);
        })
        .catch(error => {
            console.log(error)
        })
    }

     //Para hacer fetch
     const getUserCurriculumAsync = async () => {
        let path = `/users/${userCurriculum.user.sub}`;
        const apiName = "tesis";
        
        const response  = await API.get(apiName, path);
        console.log("Respuesta Async Await",response);
        console.log("Comparacion". response === undefined)
        try{
        setUserCurriculum({
            firstName:response[0].firstName,
            lastName:response[0].lastName,
            cedula:response[0].cedula,
            telefono:response[0].telefono,
            categoria:response[0].categoria,
            trabajo:response[0].trabajo,
            tarifa:response[0].tarifa,
            ciudad:response[0].ciudad,
            pais:response[0].pais,
            postalCode:response[0].postalCode,
            aboutMe:response[0].aboutMe,
            experiencia:response[0].experiencia,
            })
            console.log("Final usuario con useState",userCurriculum)}
            catch(err){
                console.log("Error que se prodria mejorar mas adelante sin try catch",err)
            }
            setLoading(false);
        
        
    }

    const classes = useStyles();
    return (
        <div>
            <Header
                    brand="Proyecto Titulación"
                    rightLinks={
                        <HeaderLinksHome
                            checkUser={checkUser}
                            signOut={signOut}
                        />
                    }
                    fixed
                    color="dark"
                    changeColorOnScroll={{
                    height: 400,
                    color: "white"
                    }}
                    //{...rest}
            />

            <Parallax image={require("assets/img/curriculum.jpg")}>
                <div className={classes.container}>
                <GridContainer>
                    <GridItem>
                    <div className={classes.brandgrey}>
                        <h1 className={classes.title}>Tu Curriculum</h1>
                        <h3 className={classes.subtitle}>
                            Aquí Puedes Dar a Conocer lo que Sabes Hacer
                        </h3>
                    </div>
                    </GridItem>
                </GridContainer>
                </div>
            </Parallax>
            
            {loading ? <Spinner /> : <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={4}>
                        <UserAvatar />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="warning">
                                <h3 className={classes.cardTitleWhite}>Curriculum de Trabajo</h3>
                                <p className={classes.cardCategoryWhite}>Manten tu Curriculum Actualizado</p>
                            </CardHeader>
                            <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Nombres"
                                    id="firstName"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: handleCurriculumInput,
                                        value: userCurriculum.firstName
                                      }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Apellidos"
                                    id="lastName"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: handleCurriculumInput,
                                        value: userCurriculum.lastName
                                      }}
                                />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Cedula"
                                    id="cedula"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: handleCurriculumInput,
                                        value: userCurriculum.cedula
                                      }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Telefono"
                                    id="telefono"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: handleCurriculumInput,
                                        value: userCurriculum.telefono
                                      }}
                                />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Categoría Trabajo"
                                    id="categoria"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: handleCurriculumInput,
                                        value: userCurriculum.categoria
                                      }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                    labelText="Nombre Trabajo"
                                    id="trabajo"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: handleCurriculumInput,
                                        value: userCurriculum.trabajo
                                      }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Tarifa en $"
                                    id="tarifa"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: handleCurriculumInput,
                                        value: userCurriculum.tarifa
                                      }}
                                />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Ciudad"
                                    id="ciudad"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: handleCurriculumInput,
                                        value: userCurriculum.ciudad
                                      }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Pais"
                                    id="pais"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: handleCurriculumInput,
                                        value: userCurriculum.pais
                                      }}
                                />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Código Postal (opcional)"
                                    id="postalCode"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: handleCurriculumInput,
                                        value: userCurriculum.postalCode
                                      }}
                                />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                <InputLabel style={{ color: "#AAAAAA" }}>Acerca de Mí</InputLabel>
                                <CustomInput
                                    labelText="Describe brevemente porque elegirte para ser contratado"
                                    id="aboutMe"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                    type: "text",
                                    onChange: handleCurriculumInput,
                                    value: userCurriculum.aboutMe,
                                    multiline: true,
                                    rows: 3
                                    }}
                                />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                <InputLabel style={{ color: "#AAAAAA" }}>Mi Experiencia Laboral</InputLabel>
                                <CustomInput
                                    labelText="En esta sección puedes detallar tu experiencia laboral"
                                    id="experiencia"
                                    formControlProps={{
                                    fullWidth: true
                                    }}
                                    inputProps={{
                                    type: "text",
                                    onChange: handleCurriculumInput,
                                    value: userCurriculum.experiencia,
                                    multiline: true,
                                    rows: 5
                                    }}
                                />
                                </GridItem>
                            </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button 
                                    color="warning" 
                                    onClick={submitCurriculumAsync}>
                                    Actualizar Curriculum
                                </Button>
                            </CardFooter>
                        </Card>
                        </GridItem>

                    </GridContainer>
                </div>
        </div>}
            <Footer />
        </div>
    );
}