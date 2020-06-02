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
import UserAvatar from 'views/UserCurriculum/UserCurriculumSections/UserAvatar';
import Spinner from 'views/Loading/Spinner';
//AWS
import Amplify, { Auth, API } from "aws-amplify";
import avatar from "assets/img/no-image.png";

const useStyles = makeStyles(styles);

export default function Categories(props) {
    const classes = useStyles();
    const {checkUser, signOut} = props;
    const [user, setUser] = useState();

   /*  useEffect(() => {
        getCurrentUserAsync();
        console.log("Desde UseEffect",user);
      }, []); */

      const getCurrentUserAsync = async () => {
       
        let currentUser= await Auth.currentAuthenticatedUser();
        let user = { username: currentUser }
        console.log(user);
        setUser(
            user
        )
        console.log("Todo User", user);
  
        }

        //Para hacer fetch
     const getUserCurriculumAsync = async () => {
       /*  let path = `/user/${userCurriculum.user.sub}`; */
       let path = "/user";
        /* const apiName = "pruebatesis";
        let myInit = { 
            headers: {}, 
            queryStringParameters: { 
            },
            response: true,
        } */
        const response  = await API.get(apiName, path);
        console.log("Respuesta Async Await",response);
    }

    const CardUser = (
        <Card profile>
            <CardHeader color="info">
                <h3 className={classes.cardTitleWhite}>Trabajo: </h3>
                <p className={classes.cardCategoryWhite}>Categoría: </p>
            </CardHeader>
            <CardAvatar profile>
            <a  href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
            </a>
            </CardAvatar>
            <CardBody profile>
                <p className={classes.description}>
                    En esta parte estaría detallado ya sea la breve descripción
                    del usuario o la experiencia
                </p>
                 <Button color="info">
                    Ver Perfil del Usuario
                </Button>
                </CardBody>
        </Card>
    );
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
                            Nombre Categoría
                        </h3>
                    </div>
                    </GridItem>
                </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                <Button onClick={getUserCurriculumAsync}> Consulta API</Button>
                <GridContainer>   
                    <GridItem xs={12} sm={12} md={4}>
                        {CardUser}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        {CardUser}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        {CardUser}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        {CardUser}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        {CardUser}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        {CardUser}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        {CardUser}
                    </GridItem>
                </GridContainer>
                </div>
            </div>

            <Footer />
        </div>
    );
}