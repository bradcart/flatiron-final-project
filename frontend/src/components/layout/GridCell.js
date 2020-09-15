import React, { useState } from 'react';
import { Grid, Box, FormControl, FormControlLabel, FormLabel, Slider, Checkbox, Divider } from '@material-ui/core';
import { CirclePicker } from 'react-color';
import { useNode, Element } from '@craftjs/core';

export const GridCell = ({ children, background, width, height, border }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <Grid item xs={width}>
            <Element is={Box} id="drop" ref={ref => connect(drag(ref))}
                display="inline-flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="flex-start"
                alignItems="center"
                bgcolor={background}
                width="auto"
                height="auto"
                minHeight={height}
                border={border}
                canvas>
                {children}
            </Element>
        </Grid>
    )
};

const GridCellSettings = () => {
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
                    colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688"]}
                    width="130px"
                    onChange={color => {
                        setProp(props => props.background = color.hex)
                    }} />
            </FormControl>
            <Divider style={{ marginTop: '15px' }} />
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Width</FormLabel>
                <Slider min={1} max={12} value={width || 4} onChange={(_, value) => setProp(props => props.width = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Height</FormLabel>
                <Slider min={76} max={308} value={height || 76} onChange={(_, value) => setProp(props => props.height = value)} />
            </FormControl>

            <FormControlLabel
                control={<Checkbox checked={checked} onChange={() => handleChecked()} name="checked" />}
                label="Border"
            />

        </div>
    )
};

const GridCellDefaultProps = {
    background: "#ffffff",
    width: 4,
    height: '125px',
    border: '1px solid red'
};

GridCell.craft = {
    displayName: "Cell",
    props: GridCellDefaultProps,
    related: {
        settings: GridCellSettings
    },
    rules: {
        canMoveIn: (incomingNode) => incomingNode.data.displayName !== "Cell"
    }
};