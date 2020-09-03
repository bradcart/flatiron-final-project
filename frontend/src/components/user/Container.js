import React from "react";
import { Paper, FormControl, FormLabel, Slider, ClickAwayListener } from "@material-ui/core";
// import ColorPicker from "material-ui-color-picker";
import { CirclePicker } from "react-color";
import { useNode } from "@craftjs/core";

export const Container = ({ background, padding = 0, margin, marginTop, overflow, width, minWidth, height, minHeight, alignItems, variant, children }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <Paper ref={ref => connect(drag(ref))} style={{
            flex: 'unset',
            background,
            padding: `${padding}px`,
            margin: '5px 0',
            marginTop,
            overflow,
            width,
            minWidth,
            height,
            minHeight,
            alignItems,
            variant
        }}>
            {children}
        </Paper>
    )
}

export const ContainerSettings = () => {
    const { background, padding, actions: { setProp } } = useNode(node => ({
        background: node.data.props.background,
        padding: node.data.props.padding
    }));
    return (
        <div>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend" style={{marginBottom: "10px"}}>Background</FormLabel>
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
        </div>
    )
}

export const ContainerDefaultProps = {
    background: "#ffffff",
    padding: 3,
    margin: 0,
    width: '100%',
    height: '100px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
};

Container.craft = {
    props: ContainerDefaultProps,
    related: {
        settings: ContainerSettings
    }
}