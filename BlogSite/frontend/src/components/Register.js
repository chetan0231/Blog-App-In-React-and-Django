import React, { useState } from "react";
import SecureAxios from "../config/SecureAxios";
import { Link,useHistory } from "react-router-dom";
import { Typography,TextField, makeStyles,Button,Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const style = {
  position : {
    width: "250px",
    margin: "auto",
    marginTop: "100px"
  }
}

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
      <Box component="div" alignContent="center" ml={8} >
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
      </Box>
      <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(event) => setUsername(event.target.value)} />
      <TextField id="outlined-basic" label="Email Address" variant="outlined" />
      <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(event) => setPassword(event.target.value)}/>
      <TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
      {status ? (
          <Link to="/logIn">
            <Button variant="contained" style={{backgroundColor : '#26823a'}} color="primary" size="medium" onClick={handleSubmit}>
              Register Here
            </Button>
          </Link>
        ) : (
          <Button variant="contained" style={{backgroundColor : '#26823a'}} color="primary" size="medium" onClick={handleSubmit}>
              Register Here
            </Button>
        )}
      </form>
    </div>
    </div>
  );
}

{/* <div className="text-center login-body">
      <div className="form-signin">
        <h1 className="h3 mb-3 fw-normal">Register</h1>
        <label for="inputEmail" className="visually-hidden">
          Username
        </label>
        <input
          type="text"
          id="inputEmail"
          className="form-control mb-3"
          placeholder="Username"
          required
          autofocus
          onChange={(event) => setUsername(event.target.value)}
        />

        <label for="inputEmail" className="visually-hidden">
          Email Address
        </label>
        <input
          type="text"
          id="inputEmail"
          className="form-control mb-3"
          placeholder="Email Address"
          required
          autofocus
        />
        <label for="inputPassword" className="visually-hidden">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-3"
          placeholder="Password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />

        <label for="inputPassword" className="visually-hidden">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-3"
          placeholder="Confirm Password"
          required
        />

        {status ? (
          <Link to="/logIn">
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
              onClick={() => {
                handleSubmit();
              }}
            >
              Register Me
            </button>
          </Link>
        ) : (
          <button
            type="submit"
            className="btn btn-outline-primary btn-lg"
            onClick={() => {
              handleSubmit();
            }}
          >
            Register Me
          </button>
        )}
      </div> */}