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
import { Search, Accessibility, Apps }  from "@material-ui/icons";

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
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
            >
                <Apps  className={classes.icons} /> CATEGORÍAS
            </Button>
            </Link> 
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
