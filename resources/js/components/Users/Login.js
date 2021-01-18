import React, { useState, useEffect } from 'react'
import {
    TextField, Avatar, Button, CssBaseline, FormControlLabel,
    Checkbox, Link, Grid, Box, Container, Typography
} from '@material-ui/core'
import Axios from 'axios'
import { Redirect, withRouter } from 'react-router'
import { loginRequest } from './apiRequest/APIFunction'
import { auth } from './apiRequest/AuthRequest'
import { catchingErrors } from './apiRequest/catch'
import { SessionFlushManyErrorsMessages } from './apiRequest/SessionFlush'
import { cookies } from './apiRequest/Cookes'

// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

 function Login(props) {
    const [data, setData] = useState({})
    const [userData, setUserData] = useState({})
   const [errors, setErrors] = useState(false)
    useEffect(() => {
        cookies.get('token')?props.history.push('/profile/account'):null
        document.title='Login'

    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()

    auth.login(data).catch(errors=>setErrors(catchingErrors(errors)))
    }


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }





            return (
        <div className='container main'>

            <form onSubmit={handleSubmit} className='sign-in-form' noValidate autoComplete="off">
                <Container component="main" maxWidth="xs">
                    <SessionFlushManyErrorsMessages errors={errors}/>
                    <CssBaseline />
                    <div >
                        <Avatar className={''}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
        </Typography>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleChange}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={''}

                            >
                                Sign In
          </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="#" variant="body2">
                                        Forgot password?
              </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>

                    </div>
                    <Box mt={8}>

                    </Box>
                </Container>
            </form>
        </div>
    )
}
export default withRouter(Login)
