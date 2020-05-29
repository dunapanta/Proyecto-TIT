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
import { Storage, Auth } from 'aws-amplify';

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
//Añado
Storage.configure({  level: "public" });

export default function UserAvatar() {
    const classes = useStyles();
    const [image, setImage] = useState();
    const [username, setUserName] = useState({username: ""});
    /* const [userImage, setuserImage] = useState({
      fileUrl:'',
      file: '',
      filename: ''
    }) */
    // Añado
    let fileInput = React.createRef();

    useEffect(() => {
      getCurrentUserAsync();
      console.log("Desde UseEffect",username);
    }, []);

    const getCurrentUserAsync = async () => {
       
      let currentUser= await Auth.currentAuthenticatedUser();
      let user = { username: currentUser.username }
      console.log(user);
      setUserName(
          username.username = user
      )
      console.log("UserName", username.username.username);
      /* onPageRendered() */
      getProfilePictureAsync()

      }
  
    const onPageRendered = async () => {
      getProfilePicture();
    };
  
    const getProfilePicture =  () => {
      Storage.get(`${username.username.username}.png`) 
        .then(url => {
          console.log(url)
          var myRequest = new Request(url);
          fetch(myRequest).then(function(response) {
            if (response.status === 200) {
              setImage(url);
            }
          });
        })
        .catch(err => console.log(err));
    };

    const getProfilePictureAsync =  async () => {
      console.log("Desde Await", username)
      const storage =  await Storage.get(`${username.username.username}.png`);
      console.log("Desde Await", username)
      console.log("Storage",storage)
      try{
      setImage(storage);
      }catch(err){
        console.log("Error peticion foto", err)
        setImage(avatar)
      }
    }

    const onOpenFileDialog = () => {
      fileInput.current.click();
      /* console.log("Desde AVATAR", props); */
    };
    const onProcessFile = e => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      try {
        reader.readAsDataURL(file);
      } catch (err) {
        console.log("Error Fotografia", err);
      }
      reader.onloadend = () => {
        setImage(reader.result);
      };
      Storage.put(`${username.username}.png`, file, {
        contentType: "image/png"
      })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    };

    /* const handleChangeImage = e => {
      const file = e.target.files[0];
      setuserImage({
        fileUrl: URL.createObjectURL(file),
        file,
        filename: file.name
      })
    } */

    /* const saveFile = () => {
      Storage.put(userImage.filename, userImage.file )
      .then(() => {
        console.log('subiendo correctamente')
        console.log(userImage.fileUrl)
        setuserImage({
          fileUrl:'',
          file: '',
          filename: ''
        })
      })
      .catch(err => {
        console.log('error en subida de foto', err)
      })
    } */

    return(
        <Card profile>
            <CardHeader color="warning">
                <h3 className={classes.cardTitleWhite}>Foto Curriculum</h3>
                <p className={classes.cardCategoryWhite}>Actualiza tu Fotografía</p>
            </CardHeader>
            <CardAvatar profile>
              <a  href="#pablo" onClick={e => e.preventDefault()}>
                <img src={image} onClick={onOpenFileDialog} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <>
                <input
                  id="avatar-input"
                  type="file"
                  hidden
                  ref={fileInput}
                  onChange={onProcessFile} 
                  accept="image/*"
                />
                <label htmlFor="avatar-input">
                  <Button
                    color="primary"
                    component="span"
                    color="warning"
                    variant="contained"
                    /* onClick={onOpenFileDialog} */
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
             {/*  <Button color="warning" onClick={onOpenFileDialog}>
                Subir Fotografía
              </Button> */}
            </CardBody>
          </Card>
    );
}