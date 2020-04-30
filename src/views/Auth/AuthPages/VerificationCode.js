import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import { VpnKey } from "@material-ui/icons";

//Amplify integracion Cognito
import { Auth } from "aws-amplify";


const useStyles = makeStyles(styles);

export default function Verify({ inputs, switchPage, handleFormInput}) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  //const { ...rest } = props;

  const handleVerification = event => {
    event.preventDefault();
    const { username, code } = inputs;

    Auth.confirmSignUp(username, code)
    .then( data => { 
        console.log("Confirmacion Exitosa");
        console.log(data);
    })
    .then(() => switchPage("SignIn"))
    .catch( err => console.log("Houston problemas: ", err))
  }

  return (
    <div>
      {/* <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      /> */}
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Confirmar Cuenta</h4>
                  {/*   <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div> */}
                  </CardHeader>
                  <strong><p className={classes.divider}>Código de Confirmación</p></strong>
                  <CardBody>
                    
                    <CustomInput
                      labelText="Ingresar Código"
                      id="code"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        onChange: handleFormInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <VpnKey className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />  
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={handleVerification}>
                      CONFIRMAR
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer whiteFont /> */}
      </div>
    </div>
  );
}
