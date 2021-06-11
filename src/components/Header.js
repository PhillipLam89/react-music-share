import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { HeadsetTwoTone } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2) //spacing method allows us to set margins without css
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar color="primary" position="fixed">
      <Toolbar>
        <HeadsetTwoTone  />
        <Typography style={{width: '100%', textAlign: 'center'}} className={classes.title} text-align="center" variant="h6" component="h1">
          Phillip's Soundcloud & Youtube Music Share App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
