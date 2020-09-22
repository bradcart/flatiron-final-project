import React, { useState, useEffect } from 'react';
import { useNode, useEditor } from "@craftjs/core";
import ContentEditable from 'react-contenteditable';
import FontPicker from "font-picker-react";
import { Slider, FormControl, FormControlLabel, Checkbox, Select, MenuItem, IconButton, Typography, Divider } from "@material-ui/core";
import { CirclePicker } from 'react-color';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Heading.css';



export const Heading = ({ text, font, fontSize, textAlign, fontWeight, fontStyle, color, top, left, width, height, border, textShadow }) => {
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
            ref={enabled ? ref => connect(drag(ref)) : null}
            onClick={enabled ? () => setEditable(true) : null}
            style={{ position: 'absolute', display: 'inline-block', textAlign: textAlign, width: `${width}px`, height: `${height}px`, top: top, left: left, border: border }}
        >
            <ContentEditable
                disabled={enabled ? !editable : true}
                html={text}
                onChange={e => setProp(props => props.text = e.target.value)}
                // tagName={font}
                // className="apply-font"
                style={{ display: 'inline-flex', color: color, fontFamily: font, fontSize: `${fontSize}px`, minWidth: `150px`, fontWeight: fontWeight, fontStyle: fontStyle, textShadow: textShadow }}
            />
        </div>
    )
}

const HeadingSettings = () => {
    const { actions: { setProp }, font, fontSize, color, fontWeight, fontStyle, textAlign, textShadow, width, height, left, top } = useNode((node) => ({
        fontSize: node.data.props.fontSize,
        font: node.data.props.font,
        color: node.data.props.color,
        fontWeight: node.data.props.fontWeight,
        fontStyle: node.data.props.fontStyle,
        textAlign: node.data.props.textAlign,
        top: node.data.props.top,
        left: node.data.props.left,
        width: node.data.props.width,
        height: node.data.props.height,
        border: node.data.props.border,
        textShadow: node.data.props.textShadow
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

    const [activeFontFamily, setActiveFontFamily] = useState("Open Sans")

    // const handleJustify = (string) => {
    //     setProp(props => props.justifyContent = string)
    // };

    // const handleAlign = (string) => {
    //     setProp(props => props.alignItems = string)
    // };

    const [shaded, toggleShaded] = useState(false);
    const handleShaded = () => {
        if (shaded === true) {
            toggleShaded(false)
            setProp(props => props.textShadow = '')
        } else {
            toggleShaded(true)
            setProp(props => props.textShadow = '2px 2px 0 #000000')
        }
    };

    const [checked, toggleChecked] = useState(false);
    const handleChecked = () => {
        if (checked === true) {
            toggleChecked(false)
            setProp(props => props.border = '')
        } else {
            toggleChecked(true)
            setProp(props => props.border = '1px dashed black')
        }
    };

    return (
        <>
            <FormControl size="small" component="fieldset" margin="dense">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    FONT SIZE
                </Typography>
                <Slider
                    color="secondary"
                    valueLabelDisplay="auto"
                    value={fontSize || 30}
                    step={2}
                    min={20}
                    max={150}
                    style={{ marginTop: '10px' }}
                    onChange={(_, value) => {
                        setProp(props => props.fontSize = value);
                    }}
                />
            </FormControl>
            <FormControl size="small" component="fieldset" margin="dense">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    FONT
                </Typography>
                <Select
                    native
                    id="font-select"
                    value={font}
                    onChange={(e) => {
                        setProp(props => props.font = e.target.value);
                    }}
                >
                    <option value='brown_fox' className='heading-font-select'>Brown Fox</option>
                    <option value='basier_square_monoregular' className='heading-font-select'>Basier Square Mono</option>
                    <option value='saonara' className='heading-font-select'>Saonara</option>
                    <option value='maragsa' className='heading-font-select'>Maragsa</option>
                    <option value='bely-display' className='heading-font-select'>Bely</option>
                    <option value='sk_modernist_regular' className='heading-font-select'>SK Modernist</option>
                    <option value='acier-bat-gris' className='heading-font-select'>Acier BAT Gris</option>
                    <option value='acier-bat-outline' className='heading-font-select'>Acier BAT Outline</option>
                    <option value='resist_sans_light' className='heading-font-select'>Resist Sans (Light)</option>
                    <option value='resist_sans_medium' className='heading-font-select'>Resist Sans (Medium Oblique)</option>
                </Select>
            </FormControl>
            <Divider style={{ marginTop: '25px' }} />
            <FormControl margin="normal" component="fieldset" style={{ margin: '10px auto 15px auto' }}>
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
            <FormControlLabel
                style={{ margin: 'auto' }}
                control={<Checkbox checked={shaded} onChange={() => handleShaded()} name="shaded" />}
                label={<Typography id="settings-label" variant="body2" gutterBottom>TEXT SHADOW</Typography>}
            />
            <Divider style={{ marginTop: '15px' }} />
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    TEXT FIELD WIDTH
                </Typography>
                <Slider min={200} max={2046} value={width} onChange={(_, value) => setProp(props => props.width = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    TEXT FIELD HEIGHT
                </Typography>
                <Slider min={50} max={1064} value={height} onChange={(_, value) => setProp(props => props.height = value)} />
            </FormControl>
            <FormControlLabel
                style={{ margin: 'auto' }}
                control={<Checkbox checked={checked} onChange={() => handleChecked()} name="checked" />}
                label={<Typography id="settings-label" variant="body2" gutterBottom>BORDER</Typography>}
            />
            <Divider style={{ marginTop: '10px' }} />
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    LEFT/RIGHT
                </Typography>
                <Slider min={0} max={1920} value={left} onChange={(_, value) => setProp(props => props.left = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    UP/DOWN
                </Typography>
                <Slider min={0} max={900} value={top} onChange={(_, value) => setProp(props => props.top = value)} />
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


Heading.craft = {
    displayName: "Heading",
    props: {
        text: "Enter text here...",
        fontSize: 34,
        width: 200,
        height: 50,
        textShadow: ''
    },
    related: {
        settings: HeadingSettings
    }
}