import React from 'react';
// Componentes
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import avatar from "assets/img/marc.jpg";

const styles = {
    /* cardCategoryWhite: {
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
    } */
  };

const useStyles = makeStyles(styles);

export default function UserAvatar() {
    const classes = useStyles();
    return(
        <Card profile>
            <CardHeader color="warning">
                <h3 className={classes.cardTitleWhite}>Foto Curriculum</h3>
                <p className={classes.cardCategoryWhite}>Actualiza tu Fotografía</p>
            </CardHeader>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>Da clic para seleccionar una fotografía</h4>
              <p className={classes.description}>
                Al actualizar tu fotografía generas confianza 
                al empleador, al saber quién eres aumenta tu probabilidad de
                ser CONTRATADO
              </p>
              <Button color="warning">
                Subir Fotografía
              </Button>
            </CardBody>
          </Card>
    );
}