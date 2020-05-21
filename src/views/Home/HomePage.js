import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Footer from "components/Footer/Footer.js";
// Home Sections
import InfoSection from 'views/Home/HomeSections/InfoSection';
// sections for this page
import HeaderLinksHome from "components/Header/HeaderLinksHome.js";

import styles from "assets/jss/material-kit-react/views/components.js";


export const HomePage = (props) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const {checkUser, signOut} = props
    return(
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
            <Parallax image={require("assets/img/home-page.jpg")}>
                <div className={classes.container}>
                <GridContainer>
                    <GridItem>
                    <div className={classes.brand}>
                        <h1 className={classes.title}>Proyecto Titulación</h1>
                        <h3 className={classes.subtitle}>
                            Aplicación Intermediaria entre Empleador y Trabajador
                        </h3>
                    </div>
                    </GridItem>
                </GridContainer>
                </div>
            </Parallax>

            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                <InfoSection />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default HomePage