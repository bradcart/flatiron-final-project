import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Button, ButtonGroup, Checkbox, Slider, Typography, Divider, IconButton } from '@material-ui/core';
import { CirclePicker } from "react-color";
import { useNode } from '@craftjs/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import DraggableCore from 'react-draggable';

// border = 1 or 0;
// borderColor = primary.main, secondary.main, etc;
// borderRadius='50%' is circle, borderRadius={16} is rounded edges;

export const StyledBox = ({
    children,
    background,
    width,
    height,
    right,
    left,
    top,
    bottom,
    border,
    borderColor,
    borderRadius,
    justifyContent,
    alignItems
}) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <Box
            ref={ref => connect(drag(ref))}
            id='handle'
            display="inline-flex"
            position="absolute"
            right={right}
            left={left}
            top={top}
            bottom={bottom}
            flexWrap="wrap"
            boxSizing="border-box"
            justifyContent={justifyContent}
            alignItems={alignItems}
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

export const StyledBoxSettings = () => {
    const { background, width, height, right, left, top, bottom, border, borderColor, actions: { setProp } } = useNode(node => ({
        background: node.data.props.background,
        width: node.data.props.width,
        height: node.data.props.height,
        borderRadius: node.data.props.borderRadius,
        border: node.data.props.border,
        borderColor: node.data.props.borderColor,
        justifyContent: node.data.props.justifyContent,
        alignItems: node.data.props.alignItems,
        right: node.data.props.right,
        left: node.data.props.left,
        top: node.data.props.top,
        bottom: node.data.props.bottom
    }))

    const [checked, toggleChecked] = useState(false);
    const [rounded, toggleRounded] = useState(false);
    const [transparent, toggleTransparent] = useState(false);

    const handleTransparent = () => {
        if (transparent === true) {
            toggleTransparent(false)
            setProp(props => props.background = '#666666')
        } else {
            toggleTransparent(true)
            setProp(props => props.background = 'transparent')
        }
    };

    const handleChecked = () => {
        if (checked === true) {
            toggleChecked(false)
            setProp(props => props.border = 0)
        } else {
            toggleChecked(true)
            setProp(props => props.border = 1)
        }
    };

    const handleRounded = () => {
        if (rounded === true) {
            toggleRounded(false)
            setProp(props => props.borderRadius = '0')
        } else {
            toggleRounded(true)
            setProp(props => props.borderRadius = '50%')
        }
    };

    const handleJustify = (string) => {
        setProp(props => props.justifyContent = string)
    };

    const handleAlign = (string) => {
        setProp(props => props.alignItems = string)
    };

    const colors = ["#76323F", "#DB4024", "#ff3a22", "#fea49f", "#acb7ae", "#008c58", "#005a23", "#5CDB95", "#efa202", "#ffc044", "#ffeb00", "#f54c2d", "#301934", "#032053", "#0f0bde", "#db0081"];
    const neutrals = ["#FFFFFF", "#FBFFFF", "#F6F4F2", "#DEDDDB", "#EFEFEF", "#E3E2DF", "#F0F5F3", "#E8DFE0", "#eee9dd", "#D8CFD0", "#AFABA2", "#413F3D", "#212121", "#1b1b1b", "#141414", "#000000"];

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

    return (
        <div>
            <FormControl margin="normal" component="fieldset" style={{ margin: 'auto' }}>
                <Typography id="settings-label" variant="body2" gutterBottom>
                    BACKGROUND
                </Typography>
                <div style={{ display: 'inline' }}>
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
                <FormControlLabel
                    control={<Checkbox checked={transparent} onChange={() => handleTransparent()} name="checked" />}
                    label={<Typography id="settings-label" variant="body2" gutterBottom>TRANSPARENT</Typography>}
                    style={{ margin: '15px auto 0 auto' }}
                />
            </FormControl>
            <Divider style={{ marginTop: '10px' }} />
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    WIDTH
                </Typography>
                <Slider min={100} max={2100} value={width || 100} onChange={(_, value) => setProp(props => props.width = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    HEIGHT
                </Typography>
                <Slider min={100} max={1920} value={height || 100} onChange={(_, value) => setProp(props => props.height = value)} />
            </FormControl>
            <Divider />
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    LEFT/RIGHT
                </Typography>
                <Slider min={-252} max={2212} value={left} valueLabelDisplay="auto" onChange={(_, value) => setProp(props => props.left = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    UP/DOWN
                </Typography>
                <Slider min={0} max={2500} value={top} valueLabelDisplay="auto" onChange={(_, value) => setProp(props => props.top = value)} />
            </FormControl>
            <Divider />
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={() => handleChecked()} name="checked" />}
                label={<Typography id="settings-label" variant="body2" gutterBottom>BORDER</Typography>}
            />
            <FormControlLabel
                control={<Checkbox checked={rounded} onChange={() => handleRounded()} name="checked" />}
                label={<Typography id="settings-label" variant="body2" gutterBottom>CIRCLE</Typography>}
            />
            <Divider style={{ marginBottom: '8px' }} />
            <Typography id="settings-label" variant="body2" gutterBottom>
                JUSTIFY CONTENT
            </Typography>
            <ButtonGroup fullWidth size="small" aria-label="contained secondary button group" style={{ marginBottom: '5px' }}>
                <Button variant="contained" onClick={() => handleJustify('flex-start')}>LEFT</Button>
                <Button variant="contained" onClick={() => handleJustify('center')}>CENTER</Button>
                <Button variant="contained" onClick={() => handleJustify('flex-end')}>RIGHT</Button>
            </ButtonGroup>
            <ButtonGroup fullWidth size="small" aria-label="contained secondary button group" style={{ marginBottom: '20px' }}>
                <Button variant="contained" onClick={() => handleJustify('space-around')}>EVEN</Button>
                <Button variant="contained" onClick={() => handleJustify('space-between')}>FAR</Button>
            </ButtonGroup>
            <Typography id="settings-label" variant="body2" gutterBottom>
                ALIGN ITEMS
            </Typography>
            <ButtonGroup fullWidth size="small" aria-label="contained secondary button group" style={{ marginBottom: '10px' }}>
                <Button variant="contained" onClick={() => handleAlign('flex-end')}>BOTTOM</Button>
                <Button variant="contained" color="default" onClick={() => handleAlign('center')}>CENTER</Button>
                <Button variant="contained" onClick={() => handleAlign('flex-start')}>TOP</Button>
            </ButtonGroup>

        </div>
    )
};

export const StyledBoxDefaultProps = {
    background: "#666666",
    width: '100px',
    height: '100px',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
};

StyledBox.craft = {
    displayName: "Box",
    props: StyledBoxDefaultProps,
    related: {
        settings: StyledBoxSettings
    }
};
