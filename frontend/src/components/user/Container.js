import React, { useEffect, useState } from "react";
import { Paper, Box, Grid, Popper, Typography, Divider, IconButton, FormControl, FormControlLabel, Slider, Checkbox, ClickAwayListener, Button as MaterialButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@material-ui/core";
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
import lz from "lzutf8";
import copy from 'copy-to-clipboard';
import { useHistory } from 'react-router';
import Draggable, { DraggableCore } from 'react-draggable';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import CancelIcon from '@material-ui/icons/Cancel';
import SettingsIcon from '@material-ui/icons/Settings';
import BackgroundVideo from '../../pages/BackgroundVideo';
import Slide from '@material-ui/core/Slide';
import './Container.css';
import '../../components/filters/FilmGrain.css';
import TexturedPaper from '../../assets/textures/textured_paper.png';

export const Container = ({ background, padding, marginTop, margin, width, height, filmGrain, children }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <Paper id="root-container" variant="outlined" className={`${filmGrain ? "film-grain" : ""}`} square ref={connect} style={{
            position: 'absolute',
            display: 'flex',
            left: '50%',
            top: '50%',
            zIndex: 1300,
            background,
            marginTop,
            height,
            width: '80vw',
            padding,
            margin,
            alignItems: 'center',
            justifyContent: 'center',
            overflowY: 'auto',
            overflowX: 'hidden',
            elevation: 0,
            transform: `translate(-50%, -50%)`
        }}>
            <div style={{ display: 'flex', position: 'absolute', width: 'inherit', height: 'inherit', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                {children}
            </div>
        </Paper>
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//menu being used in MiniDrawer
export const ContainerSettings = () => {
    const { connectors: { connect }, background, padding, width, height, marginTop, margin, right, left, transform, filmGrain, actions: { setProp } } = useNode(node => ({
        background: node.data.props.background,
        right: node.data.props.right,
        left: node.data.props.left,
        padding: node.data.props.padding,
        margin: node.data.props.margin,
        height: node.data.props.height,
        width: node.data.props.width,
        transform: node.data.props.transform,
        filmGrain: node.data.props.filmGrain,
        marginTop: node.data.props.marginTop
    }));

    const { actions, query } = useEditor();

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

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
            backgroundColor: '#181818',
            color: '#F0F5F3',
            transition: '0.7s',
            '&:hover': {
                backgroundColor: '#202020',
                color: 'white',
                textShadow: '0 0 2px #F0F5F3'
            }
        },
        dialogButton: {
            backgroundColor: '#000000',
            color: '#F0F5F3',
            transition: '0.7s',
            '&:hover': {
                backgroundColor: '#202020',
                color: 'white',
                textShadow: '0 0 1px #F0F5F3'
            }
        },
        root: {
            track: {
                color: '#f48fb1'
            },
            thumb: {
                color: 'rgb(240, 245, 243)'
            }
        },
        exportTextField: {
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            '& .Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
            },
            color: '#000000',
            fontSize: '16px',
            focused: {}
        }
    });

    const classes = useStyles();
    const switchStyles = useN02SwitchStyles();



    const toggleFullscreen = () => {
        if (toggled === false) {
            setToggled(true);
            setProp(props => props.height = '100vh');
            setProp(props => props.padding = '0 30vw 0 30vw');
            // setProp(props => props.margin = '0 30vw 0 0');
        } else {
            setToggled(false);
            setProp(props => props.height = '80vh');
            setProp(props => props.padding = 0);
            // setProp(props => props.margin = 0);
        }
    };


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

    const history = useHistory();
    const createPage = () => {
        actions.setOptions(options => options.enabled = false);
        const json = query.serialize();
        const compressedIdentifier = lz.encodeBase64(lz.compress(json));
        const user = JSON.parse(localStorage.getItem('user'));
        const username = user['username'];
        fetch(`http://localhost:3000/pages`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                title: title,
                identifier: compressedIdentifier,
                user_id: user.id
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                history.push(`/${username}/pages/${res.id}`);
            })
    }

    const [dialogOpen, setDialogOpen] = useState(false);
    const [title, setTitle] = useState('');

    return (
        <Draggable handle="#handle" >
            <Paper style={{ position: 'relative', margin: '0 auto', zIndex: 5, width: '100%', backgroundColor: '#f2f2f2' }}>
                <div style={{ height: '30px', width: 'inherit', borderRadius: '3px 3px 0 0', backgroundColor: '#181818' }}>
                    <div style={{ color: 'rgba(240, 245, 243, 0.7)' }}>
                        <IconButton id="handle" size="small" color="inherit">
                            <DragHandleIcon id="handle" color="inherit" />
                        </IconButton>
                        {/* <IconButton edge='end' size="small" color="inherit" onClick={() => actions.clearEvents()}>
                            <CancelIcon fontSize='small' />
                        </IconButton> */}
                    </div>
                </div>
                <Box rbgcolor="rgba(28, 28, 28, 1)" px={3} py={2} textAlign="center" style={{ zIndex: 5 }}>
                    <Grid container direction="column">
                        <div style={{ margin: '0 auto 5px' }}>
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
                            <Divider style={{ margin: '14px 0' }} />
                            <MaterialButton
                                className={classes.exportButton}
                                fullWidth
                                size="small"
                                variant="contained"
                                onClick={() => {
                                    setDialogOpen(!dialogOpen);
                                    setTimeout(() => {
                                        toggleFullscreen()
                                    }, 500);
                                }}
                            >
                                EXPORT PAGE
                                </MaterialButton>
                            <Dialog
                                open={dialogOpen}
                                onClose={() => setDialogOpen(false)}
                                fullScreen
                                disableEscapeKeyDown
                                style={{ zIndex: 1700 }}
                                TransitionComponent={Transition}
                                PaperProps={{
                                    className: 'film-grain',
                                    style: {
                                        background: "#070707"
                                    }
                                }}
                            >
                                {/* <BackgroundVideo fileName='VHS-bad-tracking.mov' /> */}
                                {/* <div style={{opacity: 0.5, mixBlendMode: 'exclusion'}}><BackgroundVideo fileName='scales.mp4' /></div> */}
                                <Grid container item xs={12} direction="row" justify="center" alignItems="center">
                                    <Grid container item id="export-dialog-header" justify="center" alignItems="center" xs={12}>
                                        <DialogTitle disableTypography style={{ textAlign: 'center' }}>
                                            <h2 id="export-text">EXPORT PAGE</h2>
                                        </DialogTitle>
                                        <p id="export-description">the URL of this page will be viewable by anyone.<br />simply copy and paste to share.</p>
                                    </Grid>
                                    <DialogContent id="content">
                                        <Grid container item xs={12} direction="row" justify="center" alignItems="center">
                                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                <TextField
                                                    className={classes.exportTextField}
                                                    id="export-text-field"
                                                    placeholder="Title"
                                                    size="medium"
                                                    color="secondary"
                                                    variant="filled"
                                                    style={{
                                                        width: '40%',
                                                        margin: '0 auto'
                                                    }}
                                                    inputProps={{
                                                        className: classes.exportTextField,
                                                        style: {
                                                            padding: 5
                                                        }
                                                    }}
                                                    InputProps={{
                                                        className: classes.exportTextField,
                                                        disableUnderline: true
                                                    }}
                                                    value={title}
                                                    onChange={e => setTitle(e.target.value)}
                                                />
                                            </div>
                                            <small id="export-form-helper">page title</small>
                                        </Grid>
                                        <Grid id="export-button-footer" container item xs={12} direction="row" justify="center" alignItems="center">
                                            <MaterialButton
                                                id="export-dialog-button"
                                                className={classes.dialogButton}
                                                variant="contained"
                                                onClick={() => {
                                                    toggleFullscreen()
                                                    setDialogOpen(false)
                                                }}
                                            >
                                                CANCEL
                                            </MaterialButton>
                                            <MaterialButton
                                                id="export-dialog-button"
                                                className={classes.dialogButton}
                                                variant="contained"
                                                onClick={() => {
                                                    setDialogOpen(false);
                                                    createPage();
                                                    // const json = lz.decompress(lz.decodeBase64(stateToLoad));
                                                    // actions.deserialize(json);
                                                    // setSnackbarMessage("State loaded")
                                                }}
                                            >
                                                SUBMIT
                                            </MaterialButton>
                                        </Grid>
                                    </DialogContent>
                                </Grid>
                            </Dialog>
                            {/* <Divider style={{ marginTop: '15px' }} />
                                <FormControl fullWidth={true} margin="normal" component="fieldset">
                                    <Typography id="settings-label" variant="body2" gutterBottom>
                                        PADDING
                                                </Typography>
                                    <Slider value={padding} color="secondary" onChange={(_, value) => setProp(props => props.padding = value)} />
                                </FormControl> */}
                        </div>
                    </Grid>
                </Box>
            </Paper>
        </Draggable >
    )
};

// export const ContainerSettings = () => {
//     const {background, padding, width, height, marginTop, right, actions: { setProp} } = useNode(node => ({
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
    height: '80vh',
    padding: 0,
    margin: 0,
    elevation: 0,
    filmGrain: false
};

Container.craft = {
    displayName: "Frame",
    props: ContainerDefaultProps,
    related: {
        settings: ContainerSettings
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