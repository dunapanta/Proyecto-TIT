import React from "react";
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

export default function UserCurriculum() {
  const classes = useStyles();
  return (
    <div>
         <Header
                brand="Proyecto Titulación"
                rightLinks={<HeaderLinksHome />}
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
        
        <div className={classNames(classes.main, classes.mainRaised)}>
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
                                id="first-name"
                                formControlProps={{
                                fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Apellidos"
                                id="last-name"
                                formControlProps={{
                                fullWidth: true
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
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Telefono"
                                id="telefono"
                                formControlProps={{
                                fullWidth: true
                                }}
                            />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="Categoría Trabajo"
                                id="category"
                                formControlProps={{
                                fullWidth: true
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
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Tarifa en $"
                                id="tarifa"
                                formControlProps={{
                                fullWidth: true
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
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Pais"
                                id="pais"
                                formControlProps={{
                                fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Código Postal (opcional)"
                                id="postal-code"
                                formControlProps={{
                                fullWidth: true
                                }}
                            />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                            <InputLabel style={{ color: "#AAAAAA" }}>Acerca de Mí</InputLabel>
                            <CustomInput
                                labelText="Describe brevemente porque elegirte para ser contratado"
                                id="about-me"
                                formControlProps={{
                                fullWidth: true
                                }}
                                inputProps={{
                                multiline: true,
                                rows: 3
                                }}
                            />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                            <InputLabel style={{ color: "#AAAAAA" }}>Mi Experiencia</InputLabel>
                            <CustomInput
                                labelText="En esta sección puedes detallar tu experiencia laboral"
                                id="about-me"
                                formControlProps={{
                                fullWidth: true
                                }}
                                inputProps={{
                                multiline: true,
                                rows: 5
                                }}
                            />
                            </GridItem>
                        </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="warning">Actualizar Curriculum</Button>
                        </CardFooter>
                    </Card>
                    </GridItem>

                </GridContainer>
            </div>
     </div>
        <Footer />
    </div>
  );
}