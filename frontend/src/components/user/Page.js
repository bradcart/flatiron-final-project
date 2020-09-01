import React from "react";
import { Paper, FormControl, FormLabel, Slider, ClickAwayListener } from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { useNode } from "@craftjs/core";

export const Page = ({ background, padding = 0, alignItems, variant, minHeight, minWidth, marginTop, children }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <Paper ref={ref => connect(drag(ref))} style={{
            flex: 'unset',
            background,
            padding: `${padding}px`,
            alignItems: alignItems,
            variant: variant,
            minWidth: minWidth,
            minHeight: minHeight,
            marginTop: marginTop,
        }}>
            {children}
        </Paper>
    )
}

export const PageSettings = () => {
    const { background, actions: { setProp } } = useNode(node => ({
        background: node.data.props.background
    }));
    return (
        <div>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Background</FormLabel>
                <ColorPicker defaultValue={background || '#000'} onChange={color => {
                    setProp(props => props.background = color)
                }} />
            </FormControl>
        </div>
    )
}

export const PageDefaultProps = {
    flex: 'unset',
    background: "#ffffff",
    padding: 40,
    margin: 'auto',
    marginTop: '5vh',
    width: 'auto',
    height: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
};

Page.craft = {
    props: PageDefaultProps,
    related: {
        settings: PageSettings
    }
}