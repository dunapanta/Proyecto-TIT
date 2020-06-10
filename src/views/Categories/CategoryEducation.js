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
import CardAvatar from "components/Card/CardAvatar.js";
import Parallax from "components/Parallax/Parallax.js";
import Footer from "components/Footer/Footer.js";
// sections for this page
import HeaderLinksHome from "components/Header/HeaderLinksHome.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import Spinner from 'views/Loading/Spinner';
//AWS
import Amplify, { Auth, API } from "aws-amplify";
//Router
import { useHistory } from "react-router-dom";
import avatar from "assets/img/no-image.png";

const useStyles = makeStyles(styles);

export default function CategoriaEducacion(props) {
    const classes = useStyles();
    const history = useHistory();
    const {checkUser, signOut} = props;
    const [listWorkers, setListWorkers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
       /*  getUserCurriculumAsync([]); */
       getUser()
        console.log("Desde UseEffect",listWorkers);
      }, [loading]);

     const getUser = () => {
        let path = "/users";
        const apiName = "tesis";
        API.get(apiName, path)
        .then( data =>
            {setListWorkers(data)
            setLoading(false);
            /* listWorkers.map(i =>{
                console.log(i.trabajo)
            }) */
        }
        ).catch(error => console.log("Error", error))
     }

        //Para hacer fetch
     const getUserCurriculumAsync = async () => {
       
        let path = "/users";
        const apiName = "tesis";
        let myInit = { 
            headers: {}, 
            queryStringParameters: { 
            },
            response: true,
        }
        const response  = await API.get(apiName, path);
        
        setListWorkers(response);
        
        console.log("listWorkers", listWorkers);
        console.log("0 de listWorkers", listWorkers[0]);
       
        setLoading(false);
    }

    const renderPhoto = (photo) =>{
        try{
            return require(`assets/img/${photo}.png`)
        }catch(err){
            console.log(err);
            return require(`assets/img/no-image.png`)
        }
    }

    const handlePerfil = (id_trabajador, username) => {
        console.log("Id Usuario", id_trabajador)
        /* history.push(`/contrato/${id_trabajador}`) */
        history.push({pathname: "/perfil-trabajador",
                      state:{ id_trabajador: id_trabajador,
                              username: username}, })
    }

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

            <Parallax image={require("assets/img/categories.png")}>
                <div className={classes.container}>
                <GridContainer>
                    <GridItem>
                    <div className={classes.brand}>
                        <h1 className={classes.title}>Categorías</h1>
                        <h3 className={classes.subtitle}>
                            Educación
                        </h3>
                    </div>
                    </GridItem>
                </GridContainer>
                </div>
            </Parallax>

            {listWorkers ? <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                <GridContainer>  
                    {listWorkers.map(trabajador => {
                    if(trabajador.categoria === "Educación"){
                        return (
                        <GridItem key={trabajador.user_id} xs={12} sm={12} md={4}>
                             <Card profile>
                                <CardHeader color="primary">
                        <h3 className={classes.cardTitleWhite}>Trabajo: {trabajador.trabajo}</h3>
                        <p className={classes.cardCategoryWhite}>Categoría: {trabajador.categoria}</p>
                                </CardHeader>
                                <CardAvatar profile>
                                <a  href="#pablo" onClick={e => e.preventDefault()}>
                                    <img src={renderPhoto(trabajador.user.username)} alt="..." />
                                </a>
                                </CardAvatar>
                                <CardBody profile>
                        <strong style={ {display: "block", fontSize: "18px", textAlign: "center", padding:"6px"}}>Nombre: {trabajador.firstName} {trabajador.lastName}</strong>
                        <strong style={ {display: "block", fontSize: "14px", textAlign: "center", margin:"12px"}}>Tarifa: {trabajador.tarifa}</strong>
                                    <p className={classes.description}>
                                        {trabajador.aboutMe}
                                    </p>
                                    <Button onClick={() => handlePerfil(trabajador.user_id, trabajador.user.username)} color="primary">
                                        Ver Perfil del Usuario
                                    </Button>
                                    </CardBody>
                            </Card>
                        </GridItem>
                        )}
                        })}
                </GridContainer>
                </div>
            </div>: <Spinner />}

            <Footer />
        </div>
    );
}