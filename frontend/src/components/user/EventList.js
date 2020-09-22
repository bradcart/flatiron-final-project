import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import { Text } from './Text';
import { CirclePicker } from 'react-color';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useMaterialListItemStyles } from '@mui-treasury/styles/listItem/material';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


export const EventList = ({ events, headerFont, font, dateFont, fontSize, color, divider, title }) => {
    const { connectors: { connect, drag } } = useNode();
    const classes = useMaterialListItemStyles();

    return (
        <Box ref={ref => connect(drag(ref))} minWidth={240}>
            <div style={{ margin: '0 auto 2px auto', textAlign: 'center', fontFamily: headerFont, fontSize: `${fontSize + 0.5}em`, color: color, fontWeight: 'bolder' }}>
                {title}
                {divider ? <Divider style={{ margin: '7.5px auto -5px auto' }} /> : null}
            </div>
            {events.length > 0 ? (
                events.map((newEvent, i) => {
                    return (
                        <ListItem
                            key={i}
                            style={{ margin: 0 }}
                            divider={divider}
                        // classes={classes}
                        // onClick={() => window.location.href = (`${newEvent.link}`)}
                        >
                            <ListItemText
                                disableTypography
                            >
                                <span style={{ margin: 0, fontFamily: font, fontSize: `${fontSize}em`, color: color }}>
                                    {newEvent.name}{newEvent.location}
                                </span>
                                <br />
                                <span style={{ margin: 0, fontFamily: dateFont, fontSize: `${fontSize - 0.5}em`, color: color, fontWeight: 'light' }}>
                                    {newEvent.date}
                                </span>
                            </ListItemText>
                        </ListItem>
                    )
                })) : (
                    <ListItem
                        button
                        classes={classes}
                    >
                        <span style={{ margin: '0 auto', textAlign: 'center' }}>Click me to add events!</span>
                    </ListItem>
                )}
        </Box >
    )
};

const EventListSettings = () => {
    const { actions: { setProp }, events, headerFont, font, dateFont, fontSize, color, divider, title } = useNode(node => ({
        events: node.data.props.events,
        headerFont: node.data.props.headerFont,
        font: node.data.props.font,
        dateFont: node.data.props.dateFont,
        fontSize: node.data.props.fontSize,
        color: node.data.props.color,
        divider: node.data.props.divider,
        title: node.data.props.title
    }));

    const addEvent = (e) => {
        e.preventDefault();
        const dateString = selectedDate + '';
        const splitDate = dateString.split(" ");
        const weekday = splitDate[0].toString();

        const formattedLocation = formatLocation(locationName);
        const formattedWeekday = formatWeekday(weekday);

        const formattedDate = `${formattedWeekday + ", " + splitDate[1] + " " + splitDate[2]}`;
        const newEvent = { name: eventName, location: formattedLocation, date: formattedDate }

        setProp(props => props.events.push(newEvent))
        setEventName('');
        setLocationName('');
    };

    const [listTitle, setListTitle] = useState('');
    const [locationName, setLocationName] = useState('');
    const [eventName, setEventName] = useState('');
    const [selectedDate, handleDateChange] = useState(new Date());
    const [dividerActive, toggleDividerActive] = useState(false);

    function formatLocation(value) {
        if (value === "") {
            return ""
        } else {
            return ` @ ${value}`
        }
    };

    function formatWeekday(value) {
        if (value === "Sun") {
            return "Sunday"
        } else if (value === "Mon") {
            return "Monday"
        } else if (value === "Tue") {
            return "Tuesday"
        } else if (value === "Wed") {
            return "Wednesday"
        } else if (value === "Thu") {
            return "Thursday"
        } else if (value === "Fri") {
            return "Friday"
        } else {
            return "Saturday"
        }
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

    const handleDivider = () => {
        if (dividerActive === false) {
            toggleDividerActive(true)
            setProp(props => props.divider = true)
        } else {
            toggleDividerActive(false)
            setProp(props => props.divider = false)
        }
    };

    const handleTitle = (e) => {
        e.preventDefault();
        setProp(props => props.title = listTitle)
        setListTitle('')
    }

    return (
        <div>
            <form onSubmit={(e) => handleTitle(e)}>
                <Typography id="settings-label" variant="body2">
                    LIST TITLE
                </Typography>
                <TextField
                    variant="outlined"
                    color="primary"
                    margin="dense"
                    size="small"
                    id="label"
                    name="TITLE"
                    placeholder="Title"
                    value={listTitle}
                    onChange={e => setListTitle(e.target.value)}
                />
                <Button
                    type="submit"
                    size="small"
                    variant="outlined"
                    color="primary"
                    style={{ margin: '5px auto 10px auto' }}
                >
                    CHANGE
                </Button>
            </form>
            <Divider style={{ margin: '4px auto 6px auto' }} />
            <form onSubmit={(e) => addEvent(e)}>
                <Typography id="settings-label" variant="body2">
                    NAME
                </Typography>
                <TextField
                    variant="outlined"
                    margin="dense"
                    size="small"
                    id="label"
                    name="NAME"
                    required
                    placeholder="Event name*"
                    value={eventName}
                    onChange={e => setEventName(e.target.value)}
                />
                <Typography id="settings-label" variant="body2" style={{ marginTop: '14px' }}>
                    LOCATION
                </Typography>
                <TextField
                    variant="outlined"
                    margin="dense"
                    size="small"
                    id="label"
                    name="LOCATION"
                    placeholder="Location"
                    value={locationName}
                    onChange={e => setLocationName(e.target.value)}
                />
                <div style={{ marginTop: '20px' }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            label="DATE"
                            value={selectedDate}
                            onChange={handleDateChange}
                            animateYearScrolling
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <FormControl size="small" component="fieldset" margin="dense">
                    <Typography id="settings-label" variant="body2" gutterBottom>
                        HEADER FONT
                </Typography>
                    <Select
                        native
                        id="font-select"
                        value={headerFont}
                        onChange={(e) => {
                            setProp(props => props.headerFont = e.target.value);
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
                <FormControl size="small" component="fieldset" margin="dense">
                    <Typography id="settings-label" variant="body2" gutterBottom>
                        BODY FONT
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
                <FormControl size="small" component="fieldset" margin="dense">
                    <Typography id="settings-label" variant="body2" gutterBottom>
                        SECONDARY FONT
                </Typography>
                    <Select
                        native
                        id="font-select"
                        value={dateFont}
                        onChange={(e) => {
                            setProp(props => props.dateFont = e.target.value);
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
                <FormControl size="small" component="fieldset" margin="dense">
                    <Typography id="settings-label" variant="body2" gutterBottom>
                        FONT SIZE
                    </Typography>
                    <Slider
                        color="secondary"
                        valueLabelDisplay="auto"
                        value={fontSize}
                        step={0.5}
                        min={1}
                        max={5}
                        onChange={(_, value) => {
                            setProp(props => props.fontSize = value);
                        }}
                    />
                </FormControl>
                <FormControl margin="dense" component="fieldset" style={{ margin: '10px auto 15px auto' }}>
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
                    style={{ margin: '0 auto' }}
                    control={<Checkbox checked={divider} onChange={() => handleDivider()} name="dividerActive" />}
                    label={<Typography id="settings-label" variant="body2" gutterBottom>DIVIDERS</Typography>}
                />
                <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="primary"
                    style={{ margin: '20px 0 0 0' }}
                >
                    ADD EVENT
                </Button>
            </form>
        </div>
    )
};

EventList.craft = {
    displayName: "Event List",
    props: {
        events: [],
        fontSize: 1,
        divider: false,
        title: 'Events'
    },
    related: {
        settings: EventListSettings
    }
};