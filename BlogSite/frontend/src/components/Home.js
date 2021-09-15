import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Link,
  Typography,
  AppBar,
  Toolbar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 0.1,
  },
  root1: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Home(props) {
  const classes = useStyles();
  let history = useHistory();
  const [toggle, setToggle] = useState(false);
  const status = localStorage.getItem('status')

  const handleLogin = () => {
    history.push("/logIn");
    setToggle(!toggle);
  };

  const handleBlogs = () => {
    if (status === true){
      history.push('/myBlogs')
    }
    else if(status == undefined){
      // setToggle(!toggle)
      console.log("1")
      history.push('/logIn')
    }
  }

  const handleLogout = () => {
    setToggle(!toggle);
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title}>
              <Link
                color="inherit"
                component="button"
                variant="h5"
                underline="none"
                onClick={() => {
                  history.push("/");
                }}
              >
                BlogSite
              </Link>
            </Typography>
            <Box component="span" position="right" className={classes.root}>
              <Typography className={classes.root1}>
                <Button color="inherit" onClick={() => {history.push("/allBlogs")}}>
                  All Blogs
                </Button>
                <Button color="inherit" onClick={handleBlogs}>
                  My Blogs
                </Button>
              </Typography>
            </Box>
            <Button color="inherit" onClick={() => {history.push("/SignUp")}}>
              Register
            </Button>
            {toggle ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
