import React, { useState } from "react";
import { Paper, Box, FormControl, FormLabel, FormControlLabel, Slider, Checkbox, ClickAwayListener } from "@material-ui/core";
// import ColorPicker from "material-ui-color-picker";
import { CirclePicker } from "react-color";
import { useNode } from "@craftjs/core";

export const Container = ({ background, padding = 0, marginTop, overflow, width, minWidth, height, minHeight, alignItems, square, children }) => {
    const { connectors: { connect, drag } } = useNode();
    return (

        <Paper variant="outlined" className="container-paper" square={square} ref={ref => connect(drag(ref))} style={{
            background,
            padding: `${padding}px`,
            margin: 0,
            elevation: 0,
            marginTop,
            overflow,
            width,
            minWidth,
            height,
            minHeight,
            alignItems
        }}>
            {children}
        </Paper>
    )
}

export const ContainerSettings = () => {
    const { background, padding, width, height, square, actions: { setProp } } = useNode(node => ({
        background: node.data.props.background,
        padding: node.data.props.padding,
        width: node.data.props.width,
        height: node.data.props.height,
        square: node.data.props.square
    }));

    const [checked, toggleChecked] = useState(true);
    const handleChecked = () => {
        toggleChecked(!checked);
        setProp(props => props.square = checked)
    }

    return (
        <div>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend" style={{ marginBottom: "10px" }}>Background</FormLabel>
                <CirclePicker
                    color={background}
                    colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688"]}
                    width="130px"
                    onChange={color => {
                        setProp(props => props.background = color.hex)
                    }} />
                {/* <ColorPicker color={background} onChange={color => setProp(props => props.background = color)} /> */}
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Padding</FormLabel>
                <Slider value={padding} onChange={(_, value) => setProp(props => props.padding = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Width</FormLabel>
                <Slider min={100} max={1920} value={width} onChange={(_, value) => setProp(props => props.width = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Height</FormLabel>
                <Slider min={100} max={540} value={height} onChange={(_, value) => setProp(props => props.height = value)} />
            </FormControl>

            <FormControlLabel
                control={<Checkbox checked={checked} onChange={() => handleChecked()} name="checked" />}
                label="Rounded"
            />

        </div>
    )
};


export const ContainerDefaultProps = {
    background: "#ffffff",
    padding: 3,
    margin: 0,
    elevation: 0,
    width: '5vw',
    height: '10vh',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
};

Container.craft = {
    props: ContainerDefaultProps,
    related: {
        settings: ContainerSettings
    }
}