import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Paper, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import useStyleAuth from "./AuthStyle";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';

const ariaLabel = { "aria-label": "description" };

const Signup = () => {
  const [checked, setChecked] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [error, setError] = useState([]);
  

  const classes = useStyleAuth();
  const history = useHistory();
  let fetchapi = async() => {
    const response = axios.post('http://192.168.0.103:4000/api/auth/signup', {
      email: email, password: password, name:name , admin:checked
    }).then((result) => {
      console.log(result);
      history.push('/')
    }).catch((error) => {
      setError(error.response.data.message)
      console.log(error.response.data.message);
    })
  }
  return <>
    <Container
      component="main"
      maxWidth="xl"
      className={classes.setcontainer}
    >
      <div className={classes.setpageheading}>
        <Typography variant="h5" gutterBottom className={classes.setheading}>
          sstpl
        </Typography>
      </div>
      <Paper className={classes.setloginbackpaper} elevation={5}>
        <Typography
          variant="h6"
          gutterBottom
          className={classes.setloginheadset}
        >
          Sign up
        </Typography>
        {error}
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ padding: "0 8px" }}>
            <div className={classes.setinput}>
              <label className={classes.setlabel}>name :</label>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="outlined-basic"
                size="small"
                type="text"
                placeholder="name"
                variant="outlined"
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.setinput}>
              <label className={classes.setlabel}>Email :</label>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="outlined-basic"
                size="small"
                type="email"
                placeholder="email"
                variant="outlined"
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.setinput}>
              <label className={classes.setlabel}>password :</label>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-basic"
                size="small"
                type="password"
                placeholder="password"
                variant="outlined"
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.setinput}>
              <label className={classes.setlabel}>Confirm Password :</label>
              <TextField
                value={c_password}
                onChange={(e) => setC_password(e.target.value)}
                id="outlined-basic"
                size="small"
                type="password"
                placeholder="Confirm Password"
                variant="outlined"
              />
            </div>
          </Grid>
          <Grid item xs={12} className={classes.setcheck}>
            <Checkbox checked={checked}
              onChange={(e) => setChecked(e.target.checked)} />
            <label className={classes.setlabel}>admin</label>

          </Grid>
        </Grid>

        <Button
          variant="contained"
          className={classes.setloginbutton}
          onClick={fetchapi}
        >
          Signup
        </Button>
      </Paper>
    </Container>
  </>;
};

export default Signup;
