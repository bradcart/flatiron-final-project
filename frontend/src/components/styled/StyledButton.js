import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(3),
      color: 'white',
      padding: '5px 20px',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      transition: '1.6s',
      '&:hover': {
        backgroundColor: 'rgba(240, 245, 243, 0.6)'
      }
    }
}));

export default function StyledButton(props) {
    const classes = useStyles();
    return(
        <Button className={classes.button} onClick={props.onClick} type={props.type} fullWidth={(props.fullWidth || false)} size={props.size}>{props.children}</Button>
    )
}
