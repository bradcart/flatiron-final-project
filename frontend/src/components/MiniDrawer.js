import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Button as MaterialButton, Box, Grid, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Snackbar } from '@material-ui/core';
import { Element, useEditor } from "@craftjs/core";
import lz from "lzutf8";
import copy from 'copy-to-clipboard';

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


import { Text } from './user/Text';
import { Button } from './user/Button';
import { GridRow } from './layout/GridRow';
import { GridCell } from './layout/GridCell';
import { StyledBox } from './styled/StyledBox';
import { Card } from './user/Card';
import { Video } from './user/Video';
import { FreeDrag } from './design/FreeDrag';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

const drawerWidth = 240;

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
    // arrow: {
    //     color: theme.palette.common.black,
    // },
    // tooltip: {
    //     backgroundColor: theme.palette.common.black,
    // },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export const MiniDrawer = () => {
    const { connectors } = useEditor();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const { actions, query, enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState();
    const [stateToLoad, setStateToLoad] = useState();

    const { id } = useParams();
    const saveTemplate = () => {
        const json = query.serialize();
        const identifier = lz.encodeBase64(lz.compress(json));
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
        actions.setOptions((options) => (options.enabled = false))
        const json = query.serialize();
        const compressedIdentifier = lz.encodeBase64(lz.compress(json));
        const user = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:3000/pages`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                identifier: compressedIdentifier,
                user_id: user.id
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                history.push(`/pages/${res.id}`);
            })
    }

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
                            <h3 style={{ color: '#F0F5F3', marginBottom: '19px' }}>BRAVURA.</h3>
                            <Grid container justify='flex-end'>
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
                                    onClick={createPage}
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
                                <DialogTitle id="alert-dialog-title">Load state</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        multiline
                                        fullWidth
                                        placeholder='Paste the contents that was copied from the "Copy Current State" button'
                                        size="small"
                                        value={stateToLoad}
                                        onChange={e => setStateToLoad(e.target.value)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <MaterialButton onClick={() => setDialogOpen(false)} color="primary">
                                        Cancel
                            </MaterialButton>
                                    <MaterialButton
                                        onClick={() => {
                                            setDialogOpen(false);
                                            const json = lz.decompress(lz.decodeBase64(stateToLoad));
                                            actions.deserialize(json);
                                            setSnackbarMessage("State loaded")
                                        }}
                                        color="primary"
                                        autoFocus
                                    >
                                        Load
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
                        <ListItem button key='Text' ref={ref => connectors.create(ref, <Text />)}>
                            <ListItemIcon>
                                <Tooltip title="Text" placement="right">
                                    <TextFieldsIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary='Text' />
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
                        <ListItem button key='Song' ref={ref => connectors.create(ref, <Video />)}>
                            <ListItemIcon>
                                <Tooltip title="Song" placement="right">
                                    <LibraryMusicOutlinedIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary='Song' />
                        </ListItem>
                        <Divider />
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
                        <ListItem button key='FreeDrag' ref={ref => connectors.create(ref, <FreeDrag />)}>
                            <ListItemIcon>
                                <Tooltip title="FreeDrag" placement="right">
                                    <DragIndicatorIcon />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary='FreeDrag' />
                        </ListItem>
                    </List>
                </Drawer>
            </Grid>
        </Grid >
    );
}
