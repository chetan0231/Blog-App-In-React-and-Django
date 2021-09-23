import React, { useState } from "react";
import SecureAxios from "../config/SecureAxios";
import { Link, useHistory } from "react-router-dom";
import {
  Typography,
  TextField,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const style = {
  position: {
    width: "250px",
    margin: "auto",
    marginTop: "100px",
  },
};

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState();
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = () => {
    SecureAxios({
      method: "POST",
      url: "userApi/register/",
      data: { username: username, password: password },
    })
      .then((res) => setStatus(res.data.status))
      .catch((e) => console.log(e));
    history.push("/logIn");
  };

  return (
    <div>
      <div style={style.position}>
        <Box component="div" alignContent="center" ml={8}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
        </Box>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
          />
          {status ? (
            <Link to="/logIn">
              <Button
                variant="contained"
                style={{ backgroundColor: "#26823a" }}
                color="primary"
                size="medium"
                onClick={handleSubmit}
              >
                Register Here
              </Button>
            </Link>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: "#26823a" }}
              color="primary"
              size="medium"
              onClick={handleSubmit}
            >
              Register Here
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
