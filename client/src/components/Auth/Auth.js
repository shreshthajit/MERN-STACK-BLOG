import React from 'react'
import { Avatar,Button,Paper,Typography,Container, Grow, Grid, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../Auth/Input';
import { useState } from 'react';
import {GoogleLogin}  from 'react-google-login'; 
import Icon from './icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin,signup } from '../../actions/auth';

const initialState = {
  firstName:'',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:'',
}


  const Auth = () => {

  const [isSignup,setIsSignup]=useState(false);
  const classes=useStyles();
  const [showPassword,setShowPassword]=useState(false);
   
  const [formData,setFormData]= useState(initialState);
  const dispatch = useDispatch();

 

   const history = useHistory();


  const swhitchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
  }

  const handleSubmit = (e) => {
   // console.log(formData);
    e.preventDefault();
    if(isSignup){
     dispatch(signup(formData,history));
    }
    else{
      dispatch(signin(formData,history));
    }
  };


  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword);
  
  const googleSuccess = async(res)=>{
    console.log(res);
  }

  const googleFailure = (error)=>{
   /// console.log(error);
    //console.log("google sign in was unsuccessful.Try again later")
  }

  return (
     <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon/>
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                 <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                 <Input name="lastName" label="Last Name" handleChange={handleChange}  xs={6} />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus half />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} autoFocus half />
               { isSignup && <Input name="confirmPassword" lable="Repeat Password" handleChange={handleChange} type="password"/>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin 
           clientId='911769224545-lsolbvg0vp7g1tgb36guhqunv520tu8m.apps.googleusercontent.com'
           render={(renderProps) => (
            <Button
             className={classes.googleButton}
             color='primary'
             fullWidth
             onClick={renderProps.onClick}
             disabled={renderProps.disabled}
             startIcon={<Icon/>}
             variant="contained">
             Google Sign In
             </Button>
           )}
           onSuccess={googleSuccess}
           onFailure={googleFailure}
           cookiePolicy="single_host_origin"
          />
         
          <Grid container justify="flexend">
             <Grid item>
                <Button onClick={swhitchMode}>
                  { isSignup ? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                </Button>
             </Grid>
          </Grid>
        </form>

      </Paper>

     </Container>
  )
}

export default Auth