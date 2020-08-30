import React from "react";
import { Paper, FormControl, FormLabel, Slider, ClickAwayListener } from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { useNode } from "@craftjs/core";

export const Container = ({ background, padding = 0, margin, marginTop, overflow, width, height, minHeight, alignItems, variant, children }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <Paper ref={ref => connect(drag(ref))} style={{
            flex: 'unset',
            background,
            padding: `${padding}px`,
            margin: margin,
            marginTop: marginTop,
            overflow: overflow,
            width: width,
            height: height,
            minHeight: minHeight,
            alignItems: alignItems,
            variant: variant,
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
                <FormLabel component="legend">Background</FormLabel>
                <ColorPicker defaultValue={background || '#000'} onChange={color => {
                    setProp(props => props.background = color)
                }} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Padding</FormLabel>
                <Slider defaultValue={padding} onChange={(_, value) => setProp(props => props.padding = value)} />
            </FormControl>
        </div>
    )
}

export const ContainerDefaultProps = {
    background: "#ffffff",
    padding: 3,
    margin: 0,
    width: '100%',
    height: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
};

Container.craft = {
    props: ContainerDefaultProps,
    related: {
        settings: ContainerSettings
    }
}