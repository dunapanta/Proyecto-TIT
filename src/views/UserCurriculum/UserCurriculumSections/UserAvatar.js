import React,{useState, useEffect} from 'react';
// Componentes
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import PhotoIcon from "@material-ui/icons/Photo";
import avatar from "assets/img/no-image.png";
// Storage S3
import { Storage } from 'aws-amplify';

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

    const [userImage, setuserImage] = useState({
      fileUrl:'',
      file: "",
      filename: ""
    })

    const handleChangeImage = e => {
      const file = e.target.files[0];
      setuserImage({
        fileUrl: URL.createObjectURL(file),
        file,
        filename: file.name
      })
    }

    const saveFile = () => {
      Storage.put(userImage.filename, userImage.file )
      .then(() => {
        console.log('subiendo correctamente')
        console.log(userImage.fileUrl)
      })
      .catch(err => {
        console.log('error en subida de foto', err)
      })
    }

    return(
        <Card profile>
            <CardHeader color="warning">
                <h3 className={classes.cardTitleWhite}>Foto Curriculum</h3>
                <p className={classes.cardCategoryWhite}>Actualiza tu Fotografía</p>
            </CardHeader>
            <CardAvatar profile>
              <a  href="#pablo" onClick={e => e.preventDefault()}>
                <img src={userImage.fileUrl === "" ? avatar : userImage.fileUrl} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <>
                <input
                  id="avatar-input"
                  type="file"
                  hidden
                  onChange={handleChangeImage}
                  accept="image/*"
                />
                <label htmlFor="avatar-input">
                  <Button
                    color="primary"
                    component="span"
                    color="warning"
                    variant="contained"
                    onClick={saveFile}
                  ><PhotoIcon/>
                    Seleccionar Fotografía
                  </Button>
                </label>
              </>
              <p className={classes.description}>
                Al actualizar tu fotografía generas confianza 
                al empleador, al saber quién eres aumenta tu probabilidad de
                ser CONTRATADO
              </p>
              <Button color="warning" onClick={saveFile}>
                Subir Fotografía
              </Button>
            </CardBody>
          </Card>
    );
}