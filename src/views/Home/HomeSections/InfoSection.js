import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import WorkIcon  from "@material-ui/icons/Work";
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import VerifiedUser from "@material-ui/icons/VerifiedUser";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function InfoSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Acerca del Proyecto</h2>
          <h5 className={classes.description}>
            El presente proyecto de titulación tiene como objetivo proporcionar
            una aplicación web hecha en React y junto a servicios de AWS entregar
            al usuario la capacidad de generación de nuevo empleo al poder postularse 
            mediante su curriculum, realizar busquedas entre los postulantes o realizar 
            contrataciones según sus necesidades, es decir en esta plataforma el usuario puede ser 
            tanto TRABAJADOR como EMPLEADOR
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Trabajador"
              description="El usuario de la aplicación es capaz de definir su curriculum para dar a conocer el trabajo que puede desempeñar, puede añadir su foto personal, descripción, experiencia incluso añadir fotografías que avalen su experiencia"
              icon={WorkIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Empleador"
              description="De igual manera el usuario es capaz de buscar entre diferentes categorias de trabajo y acceder a los curriculums de los otros usuarios para poder CONTRATAR usuarios según su consideración"
              icon={EmojiPeopleIcon}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Plataforma Segura"
              description="La aplicación sirve como intermediario entre la busqueda y contratación de empleo. Se desarrolla con buenas prácticas y utiliza varrios servicios de AWS como son: Amazon S3, AWS Cognito, AWS Api Gateway, AWS Lambda y Amazon DynamoDB"
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
