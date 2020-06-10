import React, {useState, useEffect} from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Work from "@material-ui/icons/Work";
import Close from "@material-ui/icons/Close";
// core components
import Header from "components/Header/Header.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
// sections for this page
import HeaderLinksHome from "components/Header/HeaderLinksHome.js";
import Spinner from 'views/Loading/Spinner';
// Router
import { useLocation } from "react-router-dom";

import avatar from "assets/img/no-image.png";
// nodejs library that concatenates classes
import classNames from "classnames";
import Amplify, { Auth, Storage, API } from "aws-amplify";
// Para Id Contrato
import uuid from 'uuid/v4'

import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function PerfilTrabajador(props) {
  const classes = useStyles();
  const location = useLocation();
  const {checkUser, signOut} = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [image, setImage] = useState(avatar);
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
        user:null
    });
    const [empleador, setEmpleador] = useState({
        user:null
    });
    const [loading, setLoading] = useState(true);
    const [classicModal, setClassicModal] = useState(false);

    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.state.id_trabajador); // result: 'some_value'
        getUserCurriculumAsync()
        getProfilePictureAsync()
    }, [location]);

    const getProfilePictureAsync =  async () => {
        const storage =  await Storage.get(`${location.state.username}.png`);
        try{
        setImage(storage);
        }catch(err){
        console.log("Error peticion foto", err)
        setImage(avatar)
        }
    }

    //Para hacer fetch datos trabajador
    const getUserCurriculumAsync = async () => {
        let path = `/users/${location.state.id_trabajador}`;
        const apiName = "tesis";
        
        const response  = await API.get(apiName, path);
        console.log("respuestita", response)
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
            user:response[0].user,
            })
            console.log("Final usuario con useState",userCurriculum)}
            catch(err){
                console.log("Error que se prodria mejorar mas adelante",err)
            }
            setLoading(false);
    }

    const submitCurriculumAsync = async () => {
        await getCurrentUserAsync()
        let apiName = "tesiscontrato";
        let path = "/contratos";
        let data = {
            body: {
                id_contrato: uuid(),
                id_empleador: empleador.user.sub,
                id_trabajador: userCurriculum.user.sub,
                username_trabajador: userCurriculum.user.username,
                calificacion: "",
                review_empleador: ""
            }
        };
        console.log("Contrato a dynamodb")
        await API.post(apiName, path, data)
        console.log("Enviado")
        setClassicModal(true)
    }
    const getCurrentUserAsync = async () => {
       
        let currentUser= await Auth.currentAuthenticatedUser();
        console.log("Todo",currentUser)
        let user = { username: currentUser.username, ...currentUser.attributes }
        setEmpleador(
            empleador.user = user
        )
        console.log("Desde useState trabajador: ", userCurriculum);
    }

  return (
      <>
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

            <Parallax image={require("assets/img/contrato.png")}>
                <div className={classes.container}>
                <GridContainer>
                    <GridItem>
                        <div style={ {display: "block", color: "rgb(107, 144, 106)", fontSize: "35px", textAlign: "center", padding:"6px"}}>
                            <h2>Perfil Trabajador</h2>
                        </div>
                    </GridItem>
                </GridContainer>
                </div>
            </Parallax>
        {loading ? <Spinner /> :
        <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.section}>
            <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.profile}>
                                <img src={image} alt="..." className={imageClasses} />
                            <div className={classes.name}>
                                <h3 className={classes.title}>{userCurriculum.firstName} {userCurriculum.lastName}</h3>
                                <h3>{userCurriculum.trabajo}</h3>
                                <h3>${userCurriculum.tarifa}</h3>
                                <h3>{userCurriculum.ciudad}, {userCurriculum.pais}</h3>
                                </div>
                                </div>
                            </GridItem>
                    </GridContainer>
                <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={6} lg={4}>
                            <Button 
                                size="lg" 
                                onClick={submitCurriculumAsync} 
                                color="success">
                                <Work className={classes.icon} />
                                Contratar Trabajador
                            </Button>
                        <Dialog
                        classes={{
                            root: classes.center,
                            paper: classes.modal
                        }}
                        open={classicModal}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setClassicModal(false)}
                        aria-labelledby="classic-modal-slide-title"
                        aria-describedby="classic-modal-slide-description"
                        >
                        <DialogTitle
                            id="classic-modal-slide-title"
                            disableTypography
                            className={classes.modalHeader}
                        >
                            <IconButton
                            className={classes.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => setClassicModal(false)}
                            >
                            <Close className={classes.modalClose} />
                            </IconButton>
                            <h4 style={ {display: "block", color: "#4caf50", fontSize: "30px", textAlign: "center"}}>FELICIDADES</h4>
                        </DialogTitle>
                        <DialogContent
                            id="classic-modal-slide-description"
                            className={classes.modalBody}
                        >
                            <p>
                                Has Contratado a <strong>{userCurriculum.firstName} {userCurriculum.lastName}</strong> por su 
                                trabajo: <strong>{userCurriculum.trabajo}</strong>. Ahora puedes ponerte en contacto con el trabajador
                                con su email <strong>{userCurriculum.user.email}</strong> o número célular <strong>{userCurriculum.user.phone_number}</strong>
                            </p>
                            <p>
                                Gracias por tu Contratación :)
                            </p>
                        </DialogContent>
                        <DialogActions className={classes.modalFooter}>
                            <Button
                                onClick={() => setClassicModal(false)}
                                color="success"
                                >
                                Aceptar
                            </Button>
                        </DialogActions>
                        </Dialog>
                    </GridItem>
                    </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                            <div style={ {display: "block", color: "#3C4858", fontSize: "22px", textAlign: "center", padding:"6px"}}>
                                <h4>Acerca de MI:</h4>
                            </div>
                            <div className={classes.description}>
                                <p>
                                    {userCurriculum.aboutMe}
                                </p>
                            </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <div style={ {display: "block", color: "#3C4858", fontSize: "22px", textAlign: "center", padding:"6px"}}>
                                <h4>Mi Experiencia</h4>
                            </div>
                            <div className={classes.description}>
                                <p>
                                    {userCurriculum.experiencia}
                                </p>
                            </div>
                        </GridItem>
                </GridContainer>
            </div>
        </div>
        </div>}
        <Footer />
    </>
  );
}
