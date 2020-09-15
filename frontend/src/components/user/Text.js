import React, { useState, useEffect } from 'react';
import { useNode, useEditor } from "@craftjs/core";
import ContentEditable from 'react-contenteditable';
import FontPicker from "font-picker-react";
import { Slider, FormControl, FormLabel, Select, MenuItem, IconButton, Typography, Divider } from "@material-ui/core";
import { CirclePicker } from 'react-color';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import './Text.css';



export const Text = ({ text, font, fontSize, textAlign, fontWeight, fontStyle, color, top, left, width, height }) => {
    const { connectors: { connect, drag }, selected, dragged, actions: { setProp } } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged
    }));

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        !selected && setEditable(false)
    }, [selected]);

    return (
        <div
            ref={ref => connect(drag(ref))}
            onClick={() => setEditable(true)}
            style={{ position: 'absolute', zIndex: 2000, textAlign: textAlign, width: width, height: height, top: top, left: left }}
        >
            <ContentEditable
                disabled={!enabled && !editable}
                html={text}
                onChange={e => setProp(props => props.text = e.target.value)}
                // tagName={font}
                className="apply-font"
                style={{ display: 'inline-flex', color: color, fontSize: `${fontSize}px`, minWidth: `150px`, fontWeight: fontWeight, fontStyle: fontStyle }}
            />
        </div>
    )
}

const TextSettings = () => {
    const { actions: { setProp }, font, fontSize, color, fontWeight, fontStyle, textAlign, width, height, left, top } = useNode((node) => ({
        fontSize: node.data.props.fontSize,
        font: node.data.props.font,
        color: node.data.props.color,
        fontWeight: node.data.props.fontWeight,
        fontStyle: node.data.props.fontStyle,
        textAlign: node.data.props.textAlign,
        top: node.data.props.top,
        left: node.data.props.left,
        width: node.data.props.width,
        height: node.data.props.height
    }));

    // const [bold, toggleBold] = useState(false);
    // const handleBold = () => {
    //     if (bold === true) {
    //         setProp(props => props.fontWeight === 'normal')
    //         toggleBold(false)
    //     } else {
    //         setProp(props => props.fontWeight === '700')
    //         toggleBold(true)
    //     }
    // };
    // const [italic, toggleItalic] = useState(false);
    // const handleItalic = () => {
    //     if (italic === true) {
    //         setProp(props => props.fontStyle === 'normal')
    //         toggleItalic(false)
    //     } else {
    //         setProp(props => props.fontStyle === 'italic')
    //         toggleItalic(true)
    //     }
    // };



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

    const [activeFontFamily, setActiveFontFamily] = useState("Open Sans")

    // const handleJustify = (string) => {
    //     setProp(props => props.justifyContent = string)
    // };

    // const handleAlign = (string) => {
    //     setProp(props => props.alignItems = string)
    // };

    return (
        <>
            <div style={{ display: 'inline' }}>
                <EditButton cmd="italic" />
                <EditButton cmd="bold" />
                {/* <IconButton ref={connect} size='small' onClick={handleBold} >
                    <FormatBoldIcon />
                </IconButton>
                <IconButton ref={connect} size='small' onClick={handleItalic}>
                    <FormatItalicIcon />
                </IconButton> */}
            </div>
            <FormControl size="small" component="fieldset" margin="normal">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    FONT SIZE
                </Typography>
                <Slider
                    color="secondary"
                    valueLabelDisplay="auto"
                    value={fontSize || 16}
                    step={2}
                    min={1}
                    max={90}
                    style={{ marginTop: '10px' }}
                    onChange={(_, value) => {
                        setProp(props => props.fontSize = value);
                    }}
                />
            </FormControl>
            <FormControl size="small" component="fieldset" margin="normal">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    FONT
                </Typography>
                <FontPicker
                    apiKey="AIzaSyAcW76k5_8wtfLQLNGBFkx7v9kkMa2rWh0"
                    variants={["regular", "italic", "700", "700italic"]}
                    activeFontFamily={activeFontFamily}
                    onChange={(nextFont) => {
                        setActiveFontFamily(nextFont.family)
                    }}
                />

                {/* <Select
                    id="font-select"
                    value={font}
                    onChange={(e) => {
                        setProp(props => props.font = e.target.value);
                    }}
                >
                    <MenuItem value='p'>Lora</MenuItem>
                    <MenuItem value='h6'>Raleway</MenuItem>
                    <MenuItem value='h2'>Saonara</MenuItem>
                </Select> */}
            </FormControl>
            <FormControl margin="normal" component="fieldset" style={{ margin: 'auto' }}>
                <Typography id="settings-label" variant="body2" gutterBottom>
                    COLOR
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
                    color={color}
                    colors={colorPalette}
                    width="180px"
                    onChange={color => {
                        setProp(props => props.color = color.hex)
                    }} />
            </FormControl>
            <Divider style={{ marginTop: '15px' }} />
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
                <Slider min={0} max={1920} track='inverted' value={left} onChange={(_, value) => setProp(props => props.left = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    UP/DOWN
                </Typography>
                <Slider min={0} max={900} track='inverted' value={top} onChange={(_, value) => setProp(props => props.top = value)} />
            </FormControl>
        </>
    )
}

function EditButton(props) {
    return (
        <button
            key={props.cmd}
            onMouseDown={evt => {
                evt.preventDefault(); // Avoids loosing focus from the editable area
                document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
            }}
        >
            {props.cmd}
        </button>
    );
}


Text.craft = {
    displayName: "Text",
    props: {
        text: "Enter text here...",
        fontSize: 16,
        className: "apply-font"
    },
    related: {
        settings: TextSettings
    }
}