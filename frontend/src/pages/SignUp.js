import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import StyledButton from '../components/styled/StyledButton';

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//       </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(240, 245, 243, 0.6)',
        },
        secondary: {
            main: 'rgb(240, 245, 243)',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        color: 'rgb(240, 245, 243)'
    }
}));

const alertError = () => {
    return (
        <Alert severity="error">Invalid username and/or password.</Alert>
    )
}

const passwordError = () => {
    return (
        <Alert severity="error">Passwords did not match, please try.</Alert>
    )
}

export default function SignUp(props) {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setPassword('');
            setPasswordConfirm('');
            passwordError()
        } else {
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(res => res.json())
                .then(json => {
                    json["error"] ? (
                        alertError()
                    ) : (
                            props.logIn(json)
                        )
                }
            )
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    {/* <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                </Typography> */}
                    <form className={classes.form} onSubmit={(e) => handleSubmit(e)} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    inputProps={{
                                        className: classes.input
                                    }}
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    autoFocus
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputProps={{
                                        className: classes.input
                                    }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="password"
                                    type="password"
                                    label="password"
                                    name="password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputProps={{
                                        className: classes.input
                                    }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirm-password"
                                    label="confirm password"
                                    type="password"
                                    id="confirm-password"
                                    onChange={e => setPasswordConfirm(e.target.value)}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                        </Grid>
                        <Grid container align="flex-start">
                            <StyledButton
                                type="submit"
                                fullWidth={true}
                                className={classes.submit}
                                children="SIGN UP"
                            />
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={props.backButton}>
                                    BACK
                            </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={props.signSwitch}>
                                    SIGN IN INSTEAD
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                {/* <Box mt={5}>
                <Copyright />
            </Box> */}
            </Container>
        </ThemeProvider>
    );
}