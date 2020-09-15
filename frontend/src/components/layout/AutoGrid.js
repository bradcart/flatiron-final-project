import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { GridRow } from './GridRow';
// import { useFullBorderedGridStyles } from '@mui-treasury/styles/grid/fullBordered';
import { useNode, useEditor, Element } from '@craftjs/core';
import './AutoGrid.css';
import SettingsIcon from '@material-ui/icons/Settings';

const AutoGrid = ({ colWidth, border, rows }) => {
    const { connectors: { connect, drag } } = useNode();
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));
    // const [hoveredBox, setHoveredBox] = useState(null);
    // const columnWidth = { xs: colWidth };
    // const colWidth = { xs: 12, sm: 6, md: 4, lg: 3 };
    const borderColor = 'rgb(0, 0, 0)';



    // const styles = useFullBorderedGridStyles({ borderColor });
    return (
        <div>
            <Box ref={drag} width={{ xs: '100%' }} >
                <Grid container>
                    {enabled ? (
                        <IconButton ref={connect}>
                            <SettingsIcon />
                        </IconButton>
                    ) : null}
                    {Array(rows)
                        .fill(0)
                        .map((number, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Element is={GridRow} ref={connect} key={i} id={`row-${i}`} width={colWidth} border={border} canvas>

                            </Element>
                        ))}
                </Grid>
            </Box >
        </div>
    );
};



const AutoGridSettings = () => {
    const { background, width, height, border, borderColor, rows, colWidth, actions: { setProp } } = useNode(node => ({
        background: node.data.props.background,
        width: node.data.props.width,
        height: node.data.props.height,
        border: node.data.props.border,
        borderColor: node.data.props.borderColor,
        colWidth: node.data.props.colWidth,
        rows: node.data.props.columns
    }))

    const handleColumns = (num) => {
        setProp(props => props.colWidth = num)
    }

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
            <Typography id="settings-label" variant="body2" gutterBottom>
                # OF COLUMNS
            </Typography>
            <ButtonGroup fullWidth size="small" aria-label="outlined secondary button group">
                <Button onClick={() => handleColumns(12)}>One</Button>
                <Button onClick={() => handleColumns(6)}>Two</Button>
                <Button onClick={() => handleColumns(4)}>Three</Button>
            </ButtonGroup>
            <FormControl size="small" component="fieldset" margin="normal">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    # OF ROWS
                </Typography>
                <Slider
                    color="secondary"
                    valueLabelDisplay="auto"
                    value={rows}
                    step={1}
                    min={1}
                    max={15}
                    // style={{ marginTop: '10px' }}
                    onChange={(_, value) => {
                        setProp(props => props.rows = value);
                    }}
                />
            </FormControl>
            {/* <FormControl>
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleChecked} name="checked" />}
                    label="Border"
                />
            </FormControl> */}
            {/* <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Rows</FormLabel>
                <Slider min={1} max={8} value={rows || 4} onChange={(_, value) => setProp(props => props.rows = value)} />
            </FormControl> */}
            {/* <FormControl fullWidth={true} margin="normal" component="fieldset">
                <FormLabel component="legend">Columns</FormLabel>
                <Slider min={1} max={4} value={columns || 2} onChange={(_, value) => setProp(props => props.columns = value)} />
            </FormControl> */}
            {/* <ButtonGroup aria-label="outlined button group">
                <Button onClick={(e) => setVerticalSize(e)}>Half</Button>
                <Button onClick={(e) => setVerticalSize(e)}>Full</Button>
            </ButtonGroup> */}
        </div>
    )
};

const AutoGridDefaultProps = {
    background: "#ffffff",
    colWidth: 12,
    rows: 4,
    border: 1
}

AutoGrid.craft = {
    displayName: "AutoGrid",
    props: AutoGridDefaultProps,
    related: {
        settings: AutoGridSettings
    }
};

export default AutoGrid;