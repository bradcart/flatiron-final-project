import React, { useState } from 'react';
import { Grid, Box, FormControl, FormControlLabel, FormLabel, Slider, Checkbox, Divider } from '@material-ui/core';
import { CirclePicker } from 'react-color';
import { useNode, Element } from '@craftjs/core';
import { StyledBox } from '../styled/StyledBox';
import { GridCell } from '../layout/GridCell';

export const GridRow = ({ children, background, width, height, border }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <Grid item xs={width}>
            <Box ref={ref => connect(drag(ref))}
                id="box-container"
                display="flex"
                flexDirection="row"
                flexWrap="nowrap"
                justifyContent="flex-start"
                alignItems="center"
                bgcolor={background}
                width="auto"
                height="auto"
                minHeight={height}
                border={border}>
                {children}
            </Box>
        </Grid>
    )
};

const GridRowSettings = () => {
    const { background, width, height, border, borderColor, actions: { setProp } } = useNode(node => ({
        background: node.data.props.background,
        width: node.data.props.width,
        height: node.data.props.height,
        border: node.data.props.border,
        borderColor: node.data.props.borderColor
    }))

    const [checked, toggleChecked] = useState(true);

    const handleChecked = () => {
        if (checked === true) {
            toggleChecked(false)
            setProp(props => props.border = 0)
        } else {
            toggleChecked(true)
            setProp(props => props.border = 1)
        }
    };

    return (
        <div>
            <FormControl margin="normal" component="fieldset" style={{ margin: 'auto' }}>
                <FormLabel component="legend" style={{ marginBottom: "10px" }}>Background</FormLabel>
                <CirclePicker
                    color={background}
                    colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#000000", "#03a9f4", "#00bcd4", "#009688"]}
                    width="130px"
                    onChange={color => {
                        setProp(props => props.background = color.hex)
                    }} />
            </FormControl>
            <Divider style={{ marginTop: '15px' }} />
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Width</FormLabel>
                <Slider min={1} max={12} value={width || 12} onChange={(_, value) => setProp(props => props.width = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Height</FormLabel>
                <Slider min={100} max={620} value={height} onChange={(_, value) => setProp(props => props.height = value)} />
            </FormControl>

            <FormControlLabel
                control={<Checkbox checked={checked} onChange={() => handleChecked()} name="checked" />}
                label="Border"
            />

        </div>
    )
};

const GridRowDefaultProps = {
    background: "#ffffff",
    width: 12,
    height: '75.9px',
    border: 1
};

GridRow.craft = {
    displayName: "Row",
    props: GridRowDefaultProps,
    related: {
        settings: GridRowSettings
    },
    rules: {
        canMoveIn: (incomingNode) => incomingNode.data.displayName !== "Row"
    }
};