import React, { useState } from 'react';
import { Element, useEditor, useNode } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import lz from "lzutf8";
import copy from 'copy-to-clipboard';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Button as MaterialButton, Box, Grid, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Popper, Slide } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Crop169Icon from '@material-ui/icons/Crop169';
import Crop75Icon from '@material-ui/icons/Crop75';
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading } from '@fortawesome/free-solid-svg-icons';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import ChromeReaderModeOutlinedIcon from '@material-ui/icons/ChromeReaderModeOutlined';
import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import GradientIcon from '@material-ui/icons/Gradient';
import SettingsIcon from '@material-ui/icons/Settings';
import LinkIcon from '@material-ui/icons/Link';
import EventNoteIcon from '@material-ui/icons/EventNote';

import { Heading } from '../user/Heading/Heading';
import { Text } from '../user/Text';
import { Button } from '../user/Button';
import { GridRow } from '../layout/GridRow';
import { GridCell } from '../layout/GridCell';
import { StyledBox } from '../styled/StyledBox';
import { Card } from '../user/Card';
import { Video } from '../user/Video';
import { Song } from '../user/Song';
import DragBox from '../design/DragBox';
import { Landing } from '../layout/Landing';
import AutoGrid from '../layout/AutoGrid';
import { ImageContainer } from '../user/ImageContainer';
import { SocialLink } from '../user/SocialLink';
import { EventList } from '../user/EventList';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: 1250,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    exportButton: {
        color: 'rgb(240, 245, 243)',
        borderColor: 'rgb(240, 245, 243)',
        marginRight: '17px'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    exportTextField: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        '& .Mui-focused': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
        },
        color: '#000000',
        fontSize: '16px',
        focused: {}
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
    }
}));



const drawerWidth = 240;



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const MiniDrawer = (props) => {
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const { connectors, actions, query, selected } = useEditor((state) => {
        const currentNodeId = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.displayName,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings
            }
        }

        return {
            selected
        }
    });

    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState();
    const [stateToLoad, setStateToLoad] = useState();
    const [containerMenu, toggleContainerMenu] = useState(false);

    const location = useLocation();

    const { id } = useParams();
    const updateProject = () => {
        const json = query.serialize();
        const identifier = lz.encodeBase64(lz.compress(json));
        copy(identifier);
        // const user = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:3000/projects/${id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                identifier: identifier
            })
        }).then(res => res.json()).then(res => console.log(res)).then(setSnackbarMessage('Project saved!'))
    }


    const history = useHistory();
    const createProject = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const username = user['username'];
        const json = query.serialize();
        const identifier = lz.encodeBase64(lz.compress(json));
        fetch(`http://localhost:3000/projects`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                title: title,
                identifier: identifier,
                user_id: user.id
            })
        }).then(res => res.json()).then(res => {
            console.log(res)
            history.push(`/${username}/projects/${res.id}/edit`);
        })
    }

    const getTemplateId = () => {
        const json = query.serialize();
        const identifier = lz.encodeBase64(lz.compress(json));
        copy(identifier);
        // const user = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:3000/templates/${id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                identifier: identifier
            })
        }).then(res => res.json()).then(res => console.log(res)).then(setSnackbarMessage('Template saved!'))
    }

    // const { actions, query: {node}, enabled } = useEditor((state, query) => {
    //     const enabled = state.options.enabled;
    //     // const currentNodeId = 'ROOT';
    //     let selected;


    //     selected = {
    //         id: currentNodeId,
    //         name: state.node[currentNodeId].data.displayName,
    //         settings: state.node[currentNodeId].related && state.nodes[currentNodeId].related.settings,
    //         isDeletable: query.node(currentNodeId).isDeletable()
    //     };


    //     return {
    //         selected
    //     }
    // });


    const [visible, toggleVisible] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const popperOpen = Boolean(anchorEl);
    const popperId = popperOpen ? 'container-popper' : undefined;
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [dashboardDialogOpen, setDashboardDialogOpen] = useState(false);
    const [title, setTitle] = useState('');

    const handleOpen = () => {
        setDashboardDialogOpen(true)
    };

    const handleClose = () => {
        setDashboardDialogOpen(false)
    };

    const handleDashboard = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const username = user['username'];
        history.push(`/${username}/dashboard`)
    };

    return (
        <div>
            <Box className={classes.root} px={1} py={1} mt={0} mb={6} bgcolor="#1B1B1B" >
                {/* {visible !== true ? (
                    <div>
                        <SettingsIcon color="primary" />
                    </div>
                ) : null} */}
                <AppBar
                    position="fixed"
                    style={{ backgroundColor: '#181818', color: '#F0F5F3' }}
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Grid container justify='space-between'>
                            <h3
                                onClick={handleOpen}
                                style={{ color: '#F0F5F3', marginBottom: '19px', cursor: 'pointer' }}>
                                REACTORY.
                            </h3>
                            <Dialog
                                id="dashboard-dialog"
                                open={dashboardDialogOpen}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        background: "#181818",
                                        height: "120px"
                                    }
                                }}
                            >
                                <DialogTitle style={{ color: '#f0f5f3', cursor: 'default', margin: '0 auto' }}>
                                    Return to dashboard?
                            </DialogTitle>
                                <DialogActions style={{ margin: '0 auto' }}>
                                    <MaterialButton size="small" variant="outlined" color="secondary" className={classes.exportButton} onClick={handleDashboard}>
                                        Yes
                                </MaterialButton>
                                    <MaterialButton size="small" variant="outlined" color="secondary" className={classes.exportButton} onClick={handleClose}>
                                        No
                                </MaterialButton>
                                </DialogActions>
                            </Dialog>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ color: '#F0F5F3', marginBottom: '19px', cursor: 'default', fontWeight: 'normal', textAlign: 'center' }}>
                                    {props.title}
                                </h3>
                            </div>
                        </Grid>
                        <Grid container justify='flex-end'>
                            <MaterialButton
                                ref={ref => connectors.select(ref, "ROOT")}
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
                            <Popper id={popperId} open={popperOpen} anchorEl={anchorEl} style={{ zIndex: 1350, marginTop: '0.6%' }}>
                                {selected && selected.name === 'Frame' ? (
                                    <div>
                                        {console.log(selected)}
                                        {selected.settings && React.createElement(selected.settings)
                                        }
                                    </div>
                                ) : null}
                            </Popper>
                            <MaterialButton
                                className={classes.exportButton}
                                size="small"
                                variant="outlined"
                                color="secondary"
                                onClick={location.pathname.includes('templates') ? () => getTemplateId() : () => updateProject()}
                            >
                                Save
                                </MaterialButton>
                        </Grid>

                        <Dialog
                            open={createDialogOpen}
                            onClose={() => setCreateDialogOpen(false)}
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
                                        <h2 id="export-text">CREATE PROJECT</h2>
                                    </DialogTitle>
                                    <p id="export-description">create a new project from the current template.</p>
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
                                        <small id="export-form-helper">project title</small>
                                    </Grid>
                                    <Grid id="export-button-footer" container item xs={12} direction="row" justify="center" alignItems="center">
                                        <MaterialButton
                                            id="export-dialog-button"
                                            className={classes.dialogButton}
                                            variant="contained"
                                            onClick={() => {
                                                setCreateDialogOpen(false)
                                            }}
                                        >
                                            CANCEL
                                            </MaterialButton>
                                        <MaterialButton
                                            id="export-dialog-button"
                                            className={classes.dialogButton}
                                            variant="contained"
                                            onClick={() => {
                                                setCreateDialogOpen(false);
                                                createProject();
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
                        <Snackbar
                            autoHideDuration={1000}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                            open={!!snackbarMessage}
                            onClose={() => setSnackbarMessage(null)}
                            message={<span>{snackbarMessage}</span>}
                        />
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <Typography style={{ color: '#f50057', margin: '0 auto' }}>DRAG TO ADD</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List style={{ marginLeft: '5px' }}>
                    <ListItem button key='Heading' ref={ref => connectors.create(ref, <Heading />)}>
                        <ListItemIcon>
                            <Tooltip title="Heading" placement="right">
                                <FontAwesomeIcon icon={faHeading} style={{ fontSize: 20, marginLeft: '2px' }} />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Heading' />
                    </ListItem>
                    <ListItem button key='Paragraph' ref={ref => connectors.create(ref, <Text />)}>
                        <ListItemIcon>
                            <Tooltip title="Paragraph" placement="right">
                                <TextFieldsIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Paragraph' />
                    </ListItem>
                    <ListItem button key='Button' ref={ref => connectors.create(ref, <Button />)}>
                        <ListItemIcon>
                            <Tooltip title="Button" placement="right">
                                <RadioButtonCheckedIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Button' />
                    </ListItem>
                    <ListItem button key='Event List' ref={ref => connectors.create(ref, <EventList />)}>
                        <ListItemIcon>
                            <Tooltip title="Event List" placement="right">
                                <EventNoteIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Event List' />
                    </ListItem>
                    <ListItem button key='Social Link' ref={ref => connectors.create(ref, <SocialLink />)}>
                        <ListItemIcon>
                            <Tooltip title="Social Link" placement="right">
                                <LinkIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Social Link' />
                    </ListItem>
                    <Divider />
                    <ListItem button key='Image' ref={ref => connectors.create(ref, <ImageContainer />)}>
                        <ListItemIcon>
                            <Tooltip title="Image" placement="right">
                                <PhotoLibraryOutlinedIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Image' />
                    </ListItem>
                    <ListItem button key='Video' ref={ref => connectors.create(ref, <Video />)}>
                        <ListItemIcon>
                            <Tooltip title="Video" placement="right">
                                <VideoLibraryOutlinedIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Video' />
                    </ListItem>
                    <ListItem button key='Song' ref={ref => connectors.create(ref, <Song />)}>
                        <ListItemIcon>
                            <Tooltip title="Song" placement="right">
                                <LibraryMusicOutlinedIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Song' />
                    </ListItem>
                    <Divider />
                    <ListItem button key='Box' ref={ref => connectors.create(ref, <Element is={StyledBox} canvas />)}>
                        <ListItemIcon>
                            <Tooltip title="Box" placement="right">
                                <CheckBoxOutlineBlankSharpIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Box' />
                    </ListItem>
                    <ListItem button key='Row' ref={ref => connectors.create(ref, <Element is={GridRow} canvas />)}>
                        <ListItemIcon>
                            <Tooltip title="Row" placement="right">
                                <Crop75Icon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Row' />
                    </ListItem>
                    <ListItem button key='AutoGrid' ref={ref => connectors.create(ref, <Element is={AutoGrid} canvas />)}>
                        <ListItemIcon>
                            <Tooltip title="AutoGrid" placement="right">
                                <ViewModuleOutlinedIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='AutoGrid' />
                    </ListItem>
                    <ListItem button key='Card' ref={ref => connectors.create(ref, <Card />)}>
                        <ListItemIcon>
                            <Tooltip title="Card" placement="right">
                                <ViewDayOutlinedIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Card' />
                    </ListItem>
                    <ListItem button key='Landing' ref={ref => connectors.create(ref, <Element is={Landing} canvas />)}>
                        <ListItemIcon>
                            <Tooltip title="Landing" placement="right">
                                <ChromeReaderModeOutlinedIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='Landing' />
                    </ListItem>
                    <Divider />
                    <ListItem button key='DragBox' ref={ref => connectors.create(ref, <DragBox />)}>
                        <ListItemIcon>
                            <Tooltip title="DragBox" placement="right">
                                <DragIndicatorIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary='DragBox' />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </div >
    );
}
