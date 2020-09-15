import React, { useState, useEffect } from 'react';
import { Grid, Box, FormControl, FormControlLabel, Slider, Checkbox, ButtonGroup, Button, IconButton, Divider, Typography } from '@material-ui/core';
import { CirclePicker } from 'react-color';
import { useNode } from '@craftjs/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';


export const GridRow = ({ children, background, width, height, border, justifyContent, alignItems }) => {
    const { connectors: { connect, drag } } = useNode();
    const [columnWidth, setColumnWidth] = useState(12);
    useEffect(() => {
        setColumnWidth(width)
    }, [width])
    return (
        <Grid item ref={ref => connect(drag(ref))} xs={columnWidth}>
            <Box ref={connect}
                id="box-container"
                display="inline-flex"
                flexDirection="row"
                flexWrap="wrap"
                flexBasis="auto"
                justifyContent={justifyContent}
                alignItems={alignItems}
                bgcolor={background}
                width="100%"
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
        borderColor: node.data.props.borderColor,
        justifyContent: node.data.props.justifyContent,
        alignItems: node.data.props.alignItems
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

    const colors = ["#76323F", "#a30003", "#e81d24", "#F17A7E", "#687864", "#008c58", "#005a23", "#5CDB95", "#efa202", "#ffc044", "#ffeb00", "#f54c2d", "#301934", "#032053", "#0f0bde", "#db0081"];
    const neutrals = ["#FFFFFF", "#EFEFEF", "#E3E2DF", "#F0F5F3", "#E8DFE0", "#eee9dd", "#D8CFD0", "#413F3D", "#212121", "#1b1b1b", "#141414", "#000000"];

    const [colorSection, setColorSection] = useState("COLORS");
    const [colorPalette, setColorPalette] = useState(colors);
    const handleLeftClick = () => {
        if (colorSection === "NEUTRALS") {
            setColorSection("COLORS")
            setColorPalette(colors)
        }
    };
    const handleRightClick = () => {
        if (colorSection === "COLORS") {
            setColorSection("NEUTRALS")
            setColorPalette(neutrals)
        }
    };

    const handleJustify = (string) => {
        setProp(props => props.justifyContent = string)
    };

    const handleAlign = (string) => {
        setProp(props => props.alignItems = string)
    };




    return (
        <div>
            <FormControl margin="normal" component="fieldset" style={{ margin: 'auto' }}>
                <Typography id="settings-label" variant="body2" gutterBottom>
                    BACKGROUND
                </Typography>
                <div style={{ display: 'inline', marginBottom: '6px' }}>
                    <IconButton edge="start" size="small" onClick={() => handleLeftClick()}>
                        <ArrowLeftIcon />
                    </IconButton>
                    <small>
                        {colorSection}
                    </small>
                    <IconButton edge="end" size="small" onClick={() => handleRightClick()}>
                        <ArrowRightIcon />
                    </IconButton>
                </div>
                <CirclePicker
                    color={background}
                    colors={colorPalette}
                    width="180px"
                    onChange={color => {
                        setProp(props => props.background = color.hex)
                    }} />
            </FormControl>
            <Divider style={{ marginTop: '15px' }} />
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    WIDTH
                </Typography>
                <Slider min={1} max={12} value={width || 12} onChange={(_, value) => setProp(props => props.width = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    HEIGHT
                </Typography>
                <Slider min={100} max={620} value={height || 100} onChange={(_, value) => setProp(props => props.height = value)} />
            </FormControl>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={() => handleChecked()} name="checked" />}
                label={<Typography id="settings-label" variant="body2" gutterBottom>BORDERS</Typography>}
            />
            <Divider style={{marginBottom: '8px'}}/>
            <Typography id="settings-label" variant="body2" gutterBottom>
                JUSTIFY CONTENT
            </Typography>
            <ButtonGroup fullWidth size="small" aria-label="contained secondary button group" style={{marginBottom: '20px'}}>
                <Button variant="contained" onClick={() => handleJustify('flex-start')}>LEFT</Button>
                <Button variant="contained" onClick={() => handleJustify('center')}>CENTER</Button>
                <Button variant="contained" onClick={() => handleJustify('flex-end')}>RIGHT</Button>
            </ButtonGroup>
            <Typography id="settings-label" variant="body2" gutterBottom>
                ALIGN ITEMS
            </Typography>
            <ButtonGroup fullWidth size="small" aria-label="contained secondary button group" style={{marginBottom: '10px'}}>
                <Button variant="contained" onClick={() => handleAlign('flex-end')}>BOTTOM</Button>
                <Button variant="contained" color="default" onClick={() => handleAlign('center')}>CENTER</Button>
                <Button variant="contained" onClick={() => handleAlign('flex-start')}>TOP</Button>
            </ButtonGroup>


        </div>
    )
};

const GridRowDefaultProps = {
    background: "#ffffff",
    height: '131.1px',
    border: '1px dashed black'
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