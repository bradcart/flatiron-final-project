import React from "react";
import { Button as MaterialButton, Grid, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { useNode } from "@craftjs/core";
import { ThemeProvider } from "@material-ui/styles";
import EditorTheme from '../themes/EditorTheme';

const theme = EditorTheme;

export const Button = ({ size, variant, color, children }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <ThemeProvider theme={theme}>
            <MaterialButton ref={ref => connect(drag(ref))} style={{ margin: '8px 5px' }} size={size} variant={variant} color={color}>
                {children}
            </MaterialButton>
        </ThemeProvider>
    )
};

const ButtonSettings = () => {
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props
    }))

    return (
        <div>
            <ThemeProvider theme={theme}>
                <FormControl size="small" component="fieldset">
                    <FormLabel component="legend">Size</FormLabel>
                    <RadioGroup value={props.size} onChange={(e) => setProp(props => props.size = e.target.value)}>
                        <FormControlLabel label="Small" value="small" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label="Medium" value="medium" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label="Large" value="large" control={<Radio size="small" color="secondary" />} />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Variant</FormLabel>
                    <RadioGroup value={props.variant} onChange={(e) => setProp(props => props.variant = e.target.value)}>
                        <FormControlLabel label="Text" value="text" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label="Outlined" value="outlined" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label="Contained" value="contained" control={<Radio size="small" color="secondary" />} />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Color</FormLabel>
                    <RadioGroup value={props.color} onChange={(e) => setProp(props => props.color = e.target.value)}>
                        <FormControlLabel label="Default" value="default" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label="Primary" value="primary" control={<Radio size="small" color="secondary" />} />
                        <FormControlLabel label="Secondary" value="secondary" control={<Radio size="small" color="secondary" />} />
                    </RadioGroup>
                </FormControl>
            </ThemeProvider>
        </div >
    )
}

Button.craft = {
    props: {
        size: "small",
        variant: "contained",
        color: "default",
        children: "Click me"
    },
    related: {
        settings: ButtonSettings
    }
}
