import React, { useState } from "react";
import SecureAxios from "../config/SecureAxios";
import { useHistory } from "react-router";
import clsx from "clsx";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  Box,
  Button,
  Typography,
  makeStyles,
  TextField,
  FormControl,
  Input,
  InputLabel,
  IconButton,
  InputAdornment,
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
    marginTop: "250px",
  },
};

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState({});
  const classes = useStyles();
  let history = useHistory();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  localStorage.setItem("accessToken", status.access);
  localStorage.setItem("loggedIn", status.loggedIn);
  localStorage.setItem("id", status.id);
  localStorage.setItem("status", status.msg);

  const handleClick = () => {
    SecureAxios({
      method: "POST",
      url: "userApi/token/",
      data: { username: username, password: password },
    })
      .then((res) => setToken(res.data.access))
      .catch((e) => console.log(e));

    SecureAxios({
      method: "POST",
      url: "userApi/login/",
      data: { username: username, password: password },
    })
      .then((res) => setStatus(res.data))
      .catch((res) => console.log(res.data));
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div style={style.position}>
        <Box component="div" alignContent="center" ml={9}>
          <Typography variant="h5" gutterBottom>
            Log In
          </Typography>
        </Box>
        <form className={classes.root} noValidate autoComplete="on">
          <Box component="div">
            <TextField
              id="standard-basic"
              label="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </Box>
          <Box component="div">
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box component="div" display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleClick}
            >
              Login
            </Button>
          </Box>
        </form>
        {status.msg && history.push("/myBlogs")}
      </div>
    </div>
  );
}
