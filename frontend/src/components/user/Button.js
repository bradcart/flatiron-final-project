import React, { useState } from "react";
import { Button as MaterialButton, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Typography, TextField } from "@material-ui/core";
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
            <FormControl size="small" component="fieldset" style={{ marginBottom: '10px' }}>
                <FormLabel component="legend">Size</FormLabel>
                <RadioGroup value={props.size} onChange={(e) => setProp(props => props.size = e.target.value)}>
                    <FormControlLabel label="Small" value="small" control={<Radio size="small" color="secondary" />} />
                    <FormControlLabel label="Medium" value="medium" control={<Radio size="small" color="secondary" />} />
                    <FormControlLabel label="Large" value="large" control={<Radio size="small" color="secondary" />} />
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" style={{ marginBottom: '10px' }}>
                <FormLabel component="legend">Variant</FormLabel>
                <RadioGroup value={props.variant} onChange={(e) => setProp(props => props.variant = e.target.value)}>
                    <FormControlLabel label="Text" value="text" control={<Radio size="small" color="secondary" />} />
                    <FormControlLabel label="Outlined" value="outlined" control={<Radio size="small" color="secondary" />} />
                    <FormControlLabel label="Contained" value="contained" control={<Radio size="small" color="secondary" />} />
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" style={{ marginBottom: '10px' }}>
                <FormLabel component="legend">Color</FormLabel>
                <RadioGroup value={props.color} onChange={(e) => setProp(props => props.color = e.target.value)}>
                    <FormControlLabel label="Default" value="default" control={<Radio size="small" color="secondary" />} />
                    <FormControlLabel label="Primary" value="primary" control={<Radio size="small" color="secondary" />} />
                    <FormControlLabel label="Secondary" value="secondary" control={<Radio size="small" color="secondary" />} />
                </RadioGroup>
            </FormControl>
            <form onSubmit={(e) => changeLabel(e)} noValidate>
                <Typography id="settings-label" variant="body2" gutterBottom>
                    LABEL
                </Typography>
                <TextField
                    // inputProps={{
                    //     className: classes.input
                    // }}
                    variant="outlined"
                    margin="dense"
                    id="label"
                    name="LABEL TEXT"
                    onChange={e => setLabelText(e.target.value)}
                    style={{ borderRadius: '8px 0 0 8px' }}
                />
                <MaterialButton
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="secondary"
                    fullWidth={false}
                    style={{ marginTop: '7px', height: '40px', borderRadius: '0 8px 8px 0', marginBottom: '25px' }}
                // className={classes.submit}
                >
                    CHANGE
                    </MaterialButton>
            </form>
            <form onSubmit={(e) => changeLinkTo(e)} noValidate>
                <Typography id="settings-label" variant="body2" gutterBottom>
                    LINK
                </Typography>
                <TextField
                    // inputProps={{
                    //     className: classes.input
                    // }}
                    variant="outlined"
                    margin="dense"
                    id="hRef"
                    name="HREF"
                    onChange={e => setLinkTo(e.target.value)}
                    style={{ borderRadius: '4px 0 0 4px' }}
                />
                <MaterialButton
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="secondary"
                    fullWidth={false}
                    style={{ marginTop: '7px', height: '40px', borderRadius: '0 8px 8px 0' }}
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
