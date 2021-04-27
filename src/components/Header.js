import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { HeadsetTwoTone } from "@material-ui/icons";

//makeStyles (imported) allows us to set a theme

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2)
  },
  background: {
    background: 'royalblue'
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.background} position="fixed">
      <Toolbar>
        <HeadsetTwoTone />
        <Typography style={{marginLeft: '10px'}} variant="h6" component="h1">
          Apollo Music Share
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
