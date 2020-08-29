import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import StyledButton from '../components/styled/StyledButton';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

export default function SignUp(props) {
    const classes = useStyles();

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
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    inputProps={{
                                        className: classes.input
                                    }}
                                    name="artistName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="artistName"
                                    label="artist/band name"
                                    autoFocus
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
                                    id="email"
                                    label="email address"
                                    name="email"
                                    autoComplete="email"
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
                                    name="password"
                                    label="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
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
                                label="SIGN UP"
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