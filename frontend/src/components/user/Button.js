import React, { useState } from "react";
import { Button as MaterialButton, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Typography, TextField, Divider } from "@material-ui/core";
import { useNode } from "@craftjs/core";
import { ThemeProvider } from "@material-ui/styles";
import EditorTheme from '../themes/EditorTheme';

const theme = EditorTheme;

export const Button = ({ size, variant, color, label, link }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <ThemeProvider theme={theme}>
            <MaterialButton ref={ref => connect(drag(ref))} style={{ margin: '8px 5px' }} size={size} variant={variant} color={color} href={link}>
                {label}
            </MaterialButton>
        </ThemeProvider>
    )
};



const ButtonSettings = () => {
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props
    }))

    const [labelText, setLabelText] = useState('')
    const changeLabel = (e) => {
        e.preventDefault();
        setProp(props => props.label = labelText)
    }

    const [linkTo, setLinkTo] = useState('')
    const changeLinkTo = (e) => {
        e.preventDefault();
        setProp(props => props.link = linkTo)
    }


    return (
        <div>
            <ThemeProvider theme={theme}>
                <FormControl size="small" component="fieldset">
                    <Typography id="settings-label" variant="body2" gutterBottom>SIZE</Typography>
                    <RadioGroup value={props.size} onChange={(e) => setProp(props => props.size = e.target.value)}>
                        <FormControlLabel label={<Typography variant="body2">Small</Typography>} value="small" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label={<Typography variant="body2">Medium</Typography>} value="medium" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label={<Typography variant="body2">Large</Typography>} value="large" control={<Radio size="small" color="secondary" />} />
                    </RadioGroup>
                </FormControl>
                <Divider variant="middle" light style={{ margin: '10px 0' }} />
                <FormControl component="fieldset">
                    <Typography id="settings-label" variant="body2" gutterBottom>VARIANT</Typography>
                    <RadioGroup value={props.variant} onChange={(e) => setProp(props => props.variant = e.target.value)}>
                        <FormControlLabel label={<Typography variant="body2">Text</Typography>} value="text" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label={<Typography variant="body2">Outlined</Typography>} value="outlined" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label={<Typography variant="body2">Contained</Typography>} value="contained" control={<Radio size="small" color="secondary" />} />
                    </RadioGroup>
                </FormControl>
                <Divider variant="middle" light style={{ margin: '10px 0' }} />
                <FormControl component="fieldset">
                    <Typography id="settings-label" variant="body2" gutterBottom>COLOR</Typography>
                    <RadioGroup value={props.color} onChange={(e) => setProp(props => props.color = e.target.value)}>
                        <FormControlLabel label={<Typography variant="body2">Default</Typography>} value="default" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label={<Typography variant="body2">Primary</Typography>} value="primary" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label={<Typography variant="body2">Secondary</Typography>} value="secondary" control={<Radio size="small" color="secondary" />} />
                    </RadioGroup>
                </FormControl>
                <Divider variant="middle" light style={{ margin: '10px 0' }} />
                <form onSubmit={(e) => changeLabel(e)} noValidate>
                    <Typography id="settings-label" variant="body2">
                        LABEL
                </Typography>
                    <TextField
                        // inputProps={{
                        //     className: classes.input
                        // }}
                        variant="outlined"
                        margin="dense"
                        size="small"
                        id="label"
                        name="LABEL TEXT"
                        onChange={e => setLabelText(e.target.value)}
                    />
                    <MaterialButton
                        type="submit"
                        size="medium"
                        variant="outlined"
                        color="primary"
                        style={{ margin: '5px 0 15px 0' }}
                    // className={classes.submit}
                    >
                        CHANGE
                    </MaterialButton>
                </form>
                <form onSubmit={(e) => changeLinkTo(e)} noValidate>
                    <Typography id="settings-label" variant="body2" style={{ marginTop: '14px' }}>
                        LINK
                </Typography>
                    <TextField
                        // inputProps={{
                        //     className: classes.input
                        // }}
                        variant="outlined"
                        margin="dense"
                        size="small"
                        id="hRef"
                        name="HREF"
                        onChange={e => setLinkTo(e.target.value)}
                    />
                    <MaterialButton
                        type="submit"
                        size="medium"
                        variant="outlined"
                        color="primary"
                        style={{ marginTop: '5px' }}
                    // className={classes.submit}
                    >
                        ADD
                </MaterialButton>
                </form>
            </ThemeProvider>
        </div >
    )
}

Button.craft = {
    displayName: "Button",
    props: {
        size: "small",
        variant: "contained",
        color: "default",
        label: "Click me"
    },
    related: {
        settings: ButtonSettings
    }
}
