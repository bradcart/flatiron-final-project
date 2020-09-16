import React, { useState } from 'react';
import clsx from 'clsx';
import { Element, useEditor, useNode } from "@craftjs/core";
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import lz from "lzutf8";
import copy from 'copy-to-clipboard';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Button as MaterialButton, Box, Grid, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Popper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Crop169Icon from '@material-ui/icons/Crop169';
import Crop75Icon from '@material-ui/icons/Crop75';
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading } from '@fortawesome/free-solid-svg-icons';
import { faFont } from '@fortawesome/free-solid-svg-icons'
import ChromeReaderModeOutlinedIcon from '@material-ui/icons/ChromeReaderModeOutlined';
import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import GradientIcon from '@material-ui/icons/Gradient';

import { Heading } from './user/Heading/Heading';
import { Text } from './user/Text';
import { Button } from './user/Button';
import { GridRow } from './layout/GridRow';
import { GridCell } from './layout/GridCell';
import { StyledBox } from './styled/StyledBox';
import { Card } from './user/Card';
import { Video } from './user/Video';
import { Song } from './user/Song';
import { Image } from './user/Image';
import DragBox from './design/DragBox';
import { Container, ContainerDefaultProps } from './user/Container';
import { ContainerMenu } from './user/ContainerMenu';
import { Landing } from './layout/Landing';
import AutoGrid from './layout/AutoGrid';
import { ImageContainer } from './user/ImageContainer';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
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
    menuButton: {
        marginRight: 36,
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
}));



const drawerWidth = 240;

export const MiniDrawer = () => {
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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState();
    const [stateToLoad, setStateToLoad] = useState();
    const [containerMenu, toggleContainerMenu] = useState(false);

    const { id } = useParams();
    const saveTemplate = () => {
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

    const history = useHistory();
    const createPage = () => {
        actions.setOptions((options) => (options.enabled = false));
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const popperOpen = Boolean(anchorEl);
    const popperId = popperOpen ? 'container-popper' : undefined;
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box className={classes.root} px={1} py={1} mt={0} mb={6} bgcolor="#1B1B1B">
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
                            <h3 style={{ color: '#F0F5F3', marginBottom: '19px' }}>REACTORY.</h3>
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
                                <Popper id={popperId} open={popperOpen} anchorEl={anchorEl}>
                                    <ContainerMenu />
                                </Popper>
                                <MaterialButton
                                    className={classes.exportButton}
                                    size="small"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={saveTemplate}
                                >
                                    Save
                                </MaterialButton>
                                <MaterialButton
                                    className={classes.exportButton}
                                    size="small"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={setDialogOpen}
                                >
                                    Export
                                </MaterialButton>
                            </Grid>
                            <Dialog
                                open={dialogOpen}
                                onClose={() => setDialogOpen(false)}
                                fullWidth
                                maxWidth="md"
                            >
                                <DialogTitle id="alert-dialog-title">Page Title</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        fullWidth
                                        placeholder='Enter a title for your new page...'
                                        size="small"
                                        color="secondary"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <MaterialButton onClick={() => setDialogOpen(false)} color="secondary">
                                        Cancel
                            </MaterialButton>
                                    <MaterialButton
                                        onClick={() => {
                                            setDialogOpen(false);
                                            createPage();
                                            // const json = lz.decompress(lz.decodeBase64(stateToLoad));
                                            // actions.deserialize(json);
                                            // setSnackbarMessage("State loaded")
                                        }}
                                        color="secondary"
                                        autoFocus
                                    >
                                        Submit
                            </MaterialButton>
                                </DialogActions>
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
            </Grid>
            <Grid item xs={2}>
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
                        <Divider />
                        <ListItem button key='Video' ref={ref => connectors.create(ref, <Video />)}>
                            <ListItemIcon>
                                <Tooltip title="Video" placement="right">
                                    <MovieOutlinedIcon />
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
                        <ListItem button key='Image' ref={ref => connectors.create(ref, <ImageContainer />)}>
                            <ListItemIcon>
                                <Tooltip title="Image" placement="right">
                                    <PhotoLibraryOutlinedIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary='Image' />
                        </ListItem>
                        <Divider />
                        <ListItem button key='Landing' ref={ref => connectors.create(ref, <Element is={Landing} canvas />)}>
                            <ListItemIcon>
                                <Tooltip title="Landing" placement="right">
                                    <ChromeReaderModeOutlinedIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary='Landing' />
                        </ListItem>
                        <ListItem button key='AutoGrid' ref={ref => connectors.create(ref, <Element is={AutoGrid} canvas />)}>
                            <ListItemIcon>
                                <Tooltip title="AutoGrid" placement="right">
                                    <ViewModuleOutlinedIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary='AutoGrid' />
                        </ListItem>
                        <ListItem button key='Row' ref={ref => connectors.create(ref, <Element is={GridRow} canvas />)}>
                            <ListItemIcon>
                                <Tooltip title="Row" placement="right">
                                    <Crop169Icon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary='Row' />
                        </ListItem>
                        <ListItem button key='Cell' ref={ref => connectors.create(ref, <Element is={GridCell} canvas />)}>
                            <ListItemIcon>
                                <Tooltip title="Cell" placement="right">
                                    <Crop75Icon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary='Cell' />
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
                        <ListItem button key='Card' ref={ref => connectors.create(ref, <Card />)}>
                            <ListItemIcon>
                                <Tooltip title="Card" placement="right">
                                    <ViewDayOutlinedIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary='Card' />
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
                </Drawer>
            </Grid>
        </Grid >
    );
}
