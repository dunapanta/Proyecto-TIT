/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {Search, Accessibility, Apps, SettingsApplications, 
  Person, ExitToApp, School, HomeWork, Computer}  from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinksHome(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>

          <ListItem className={classes.listItem}>
                  <CustomDropdown
                    noLiPadding
                    buttonText="Categorías"
                    buttonProps={{
                      className: classes.navLink,
                      color: "transparent"
                    }}
                    buttonIcon={Apps}
                    dropdownList={[
                      <Link to="/categories" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <Button
                          color="transparent"
                          target="_blank"
                          className={classes.navLink}
                          onClick={props.checkUser}
                        >
                          <School className={classes.icons} /> Educación
                        </Button>
                      </Link>,

                      <Link to="/categories" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <Button
                          color="transparent"
                          target="_blank"
                          className={classes.navLink}
                          onClick={props.checkUser}
                        >
                          <HomeWork className={classes.icons} /> Hogar
                        </Button>
                    </Link>,

                     <Link to="/categories" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                      <Button
                        color="transparent"
                        target="_blank"
                        className={classes.navLink}
                        onClick={props.checkUser}
                      >
                        <Computer className={classes.icons} /> Teacnología
                      </Button>
                  </Link>
                      
                    ]}
                  />
          </ListItem>

       <ListItem className={classes.listItem}>
        <Link to="/register" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <Search className={classes.icons} /> BUSCAR TRABAJADOR
          </Button>
          </Link> 
      </ListItem>

      <ListItem className={classes.listItem}>
        <Link to="/curriculum" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <Accessibility  className={classes.icons} /> MI CURRICULUM
          </Button>
          </Link> 
      </ListItem>

      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Sesión"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={SettingsApplications}
          dropdownList={[
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
              onClick={props.checkUser}
            >
              <Person className={classes.icons} /> Info Usuario
            </Button>,

            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
              onClick={props.signOut}
            >
              <ExitToApp className={classes.icons} /> Salir
            </Button>,
            
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        <Tooltip
          id="github-tooltip"
          title="Ver Repositorio de Github"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://github.com/dunapanta/Proyecto-TIT"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-github"} />
          </Button>
        </Tooltip>
      </ListItem>

    </List>
  );
}
