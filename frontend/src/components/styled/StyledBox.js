import React from 'react';
import { Box, FormControl, FormLabel, Slider } from '@material-ui/core';
import { CirclePicker } from "react-color";
import { useNode } from '@craftjs/core';

// border = 1 or 0;
// borderColor = primary.main, secondary.main, etc;
// borderRadius='50%' is circle, borderRadius={16} is rounded edges;

export const StyledBox = ({
    children,
    background,
    width,
    height,
    border,
    borderColor,
    borderRadius,
}) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <Box
            ref={ref => connect(drag(ref))}
            display="inline-flex"
            flexWrap="wrap"
            boxSizing="border-box"
            width={width}
            height={height}
            border={border}
            borderColor={borderColor}
            borderRadius={borderRadius}
            style={{ background, overflowWrap: 'break-word' }}
        >
            {children}
        </Box>

    )
};

const StyledBoxSettings = () => {
    const { background, padding, width, height, actions: { setProp } } = useNode(node => ({
        background: node.data.props.background,
        width: node.data.props.width,
        height: node.data.props.height,
        border: node.data.props.border,
        borderRadius: node.data.props.borderRadius,
        borderColor: node.data.props.borderColor
    }));

    // const [checked, toggleChecked] = useState(true);
    // const handleChecked = () => {
    //     toggleChecked(!checked);
    //     setProp(props => props.square = checked)
    // }

    return (
        <div>
            <FormControl margin="normal" component="fieldset" style={{ margin: 'auto' }}>
                <FormLabel component="legend" style={{ marginBottom: "10px" }}>Background</FormLabel>
                <CirclePicker
                    color={background}
                    colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688"]}
                    width="130px"
                    onChange={color => {
                        setProp(props => props.background = color.hex)
                    }} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Width</FormLabel>
                <Slider min={100} max={1920} value={width} onChange={(_, value) => setProp(props => props.width = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Height</FormLabel>
                <Slider min={100} max={1920} value={height} onChange={(_, value) => setProp(props => props.height = value)} />
            </FormControl>

            {/* <FormControlLabel
                control={<Checkbox checked={checked} onChange={() => handleChecked()} name="checked" />}
                label="Rounded"
            /> */}

        </div>
    )
};

export const StyledBoxDefaultProps = {
    background: "#666666",
    width: '100px',
    height: '100px'
};

StyledBox.craft = {
    displayName: "Box",
    props: StyledBoxDefaultProps,
    related: {
        settings: StyledBoxSettings
    }
};
