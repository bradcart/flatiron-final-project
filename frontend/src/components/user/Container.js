import React, { useState } from "react";
import { Paper, Box, Grid, Popper, Typography, Divider, IconButton, FormControl, FormControlLabel, Slider, Checkbox, ClickAwayListener, Button as MaterialButton } from "@material-ui/core";
import { CirclePicker } from "react-color";
import Switch from '@material-ui/core/Switch';
import { useN02SwitchStyles } from '@mui-treasury/styles/switch/n02';
import { useNode, useEditor } from "@craftjs/core";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import './ContainerMenu.css';
import '../../components/filters/FilmGrain.css';

export const Container = ({ background, padding, marginTop, right, left, transform, overflowY, overflowX, width, height, alignItems, filmGrain, children }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <div>
            <span><ContainerMenu ref={connect} /></span>
            <Paper variant="outlined" className={`${filmGrain ? "container-paper film-grain" : "container-paper"}`} square ref={connect} style={{
                background,
                position: 'absolute',
                marginTop,
                right,
                left,
                height,
                width,
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: `${padding}px`,
                elevation: 0,
                alignItems,
                transform: `translate(${transform}px, 0px)`
            }}>
                {children}
            </Paper>
        </div>
    )
}

//menu being used in MiniDrawer
export const ContainerMenu = React.forwardRef((props, ref) => {
    const { connectors: { connect }, background, padding, width, height, marginTop, right, transform, filmGrain, actions: { setProp } } = useNode(node => ({
        background: node.data.props.background,
        padding: node.data.props.padding,
        width: node.data.props.width,
        height: node.data.props.height,
        marginTop: node.data.props.marginTop,
        right: node.data.props.right,
        transform: node.data.props.transform,
        filmGrain: node.data.props.filmGrain
    }));

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));



    const toggleFullscreen = () => {
        if (toggled === false) {
            setToggled(true);
            setProp(props => props.height = '100vh');
            setProp(props => props.width = '100vw');
            setProp(props => props.marginTop = '0');
            setProp(props => props.transform = 250);
        } else {
            setToggled(false);
            setProp(props => props.height = '85vh')
            setProp(props => props.width = '80vw')
            setProp(props => props.marginTop = '10vh')
            setProp(props => props.transform = 0)
        }
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'container-popper' : undefined;

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: 'rgba(240, 245, 243, 0.6)',
            },
            secondary: {
                main: '#f44336',
            },
        }
    });

    const useStyles = makeStyles({
        exportButton: {
            color: 'rgb(240, 245, 243)',
            borderColor: 'rgb(240, 245, 243)',
            marginRight: '17px'
        },
        root: {
            track: {
                color: '#f48fb1'
            },
            thumb: {
                color: 'rgb(240, 245, 243)'
            }
        }
    });

    const classes = useStyles();
    const switchStyles = useN02SwitchStyles();
    const [toggled, setToggled] = useState(false);
    const [grain, toggleGrain] = useState(false);

    const handleGrain = () => {
        if (grain === true) {
        toggleGrain(false)
        setProp(props => props.filmGrain = false)
        } else {
            toggleGrain(true)
            setProp(props => props.filmGrain = true)
        }
    }

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

    return (
        <div ref={ref} className='container-menu'>
            {enabled ? (
                <ThemeProvider theme={theme}>
                    <MaterialButton
                        ref={connect}
                        style={{ width: '164px' }}
                        className={classes.exportButton}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={handleClick}
                    >
                        Page Settings
                </MaterialButton>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                        <div>
                            <Paper style={{ position: 'relative', margin: 'auto', zIndex: 5, width: '100%', backgroundColor: '#f2f2f2' }}>
                                <Box rbgcolor="rgba(28, 28, 28, 1)" px={3} py={2} textAlign="center" style={{ zIndex: 5 }}>
                                    <Grid container direction="column">
                                        <div style={{ margin: '20px auto 5px' }}>
                                            <Typography id="settings-label" variant="body2" gutterBottom>
                                                FULLSCREEN
                                            </Typography>
                                            <Switch
                                                classes={switchStyles}
                                                checked={toggled}
                                                onChange={toggleFullscreen}
                                            />
                                            <br />
                                            <FormControlLabel
                                                control={<Checkbox checked={grain} onChange={() => handleGrain()} name="checked" />}
                                                label={<Typography id="settings-label" variant="body2" gutterBottom>FILM GRAIN (experimental)</Typography>}
                                            />
                                            <Divider style={{ marginBottom: '10px' }} />
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
                                            </FormControl>
                                            <Divider style={{ marginTop: '15px' }} />
                                            <FormControl fullWidth={true} margin="normal" component="fieldset">
                                                <Typography id="settings-label" variant="body2" gutterBottom>
                                                    PADDING
                                                </Typography>
                                                <Slider value={padding} color="secondary" onChange={(_, value) => setProp(props => props.padding = value)} />
                                            </FormControl>
                                        </div>
                                    </Grid>
                                </Box>
                            </Paper>
                        </div>
                    </Popper>
                </ThemeProvider>
            ) : null}
        </div>
    )
});

// export const ContainerSettings = () => {
//     const { background, padding, width, height, marginTop, right, actions: { setProp } } = useNode(node => ({
//         background: node.data.props.background,
//         padding: node.data.props.padding,
//         width: node.data.props.width,
//         height: node.data.props.height,
//         marginTop: node.data.props.marginTop,
//         right: node.data.props.right
//     }));

//     // const [checked, toggleChecked] = useState(true);
//     // const handleChecked = () => {
//     //     toggleChecked(!checked);
//     //     setProp(props => props.square = checked)
//     // }

//     const toggleFullscreen = () => {
//         if (height === '85vh') {
//             setProp(props => props.height = '100vh')
//         } else {
//             setProp(props => props.height = '85vh');
//         };

//         if (margin === '10vh auto 0') {
//             setProp(props => props.margin = '0 auto')
//         } else {
//             setProp(props => props.margin = '10vh auto 0')
//         }

//         if (width === '80vw') {
//             setProp(props => props.width = '100vw')
//         } else {
//             setProp(props => props.width = '80vw')
//         }

//         if (right === '10vw') {
//             setProp(props => props.right = '0')
//         } else {
//             setProp(props => props.right = '10vw')
//         }
//     };

//     return (
//         <div style={{ margin: 'auto' }}>
//             <MaterialButton
//                 // className={classes.exportButton}
//                 size="small"
//                 variant="outlined"
//                 color="secondary"
//                 onClick={toggleFullscreen}
//                 endIcon={<FullscreenIcon />}
//             >
//                 Fullscreen
//             </MaterialButton>
//             <FormControl fullWidth={true} margin="normal" component="fieldset">
//                 <FormLabel component="legend" style={{ marginBottom: "10px" }}>Background</FormLabel>
//                 <CirclePicker
//                     color={background}
//                     colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688"]}
//                     width="130px"
//                     onChange={color => {
//                         setProp(props => props.background = color.hex)
//                     }} />
//             </FormControl>
//             <FormControl fullWidth={true} margin="normal" component="fieldset">
//                 <FormLabel component="legend">Padding</FormLabel>
//                 <Slider value={padding} onChange={(_, value) => setProp(props => props.padding = value)} />
//             </FormControl>
//         </div>
//     )
// };


export const ContainerDefaultProps = {
    background: "#ffffff",
    padding: 0,
    elevation: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '85vh',
    width: '80vw',
    marginTop: '10vh',
    right: '10vw',
    transform: 0,
    filmGrain: false
};

Container.craft = {
    displayName: "Frame",
    props: ContainerDefaultProps,
    related: {
        settings: ContainerMenu
    }
}

// const toggleFullscreen = () => {
//     setToggled(true);

//     if (height === '85vh') {
//         setProp(props => props.height = '95vh')
//     } else {
//         setProp(props => props.height = '85vh');
//     };

//     if (width === '80vw') {
//         setProp(props => props.width = '100vw')
//     } else {
//         setProp(props => props.width = '80vw')
//     }

//     if (marginTop === '10vh') {
//         setProp(props => props.marginTop = '5vh')
//     } else {
//         setProp(props => props.marginTop = '10vh')
//     }

//     if (transform === 0) {
//         setProp(props => props.transform = 300)
//     } else {
//         setProp(props => props.transform = 0)
//     }

// };