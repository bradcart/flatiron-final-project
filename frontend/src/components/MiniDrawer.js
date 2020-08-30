import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TextIcon from '@material-ui/icons/TextFields'
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import copy from 'copy-to-clipboard';
import { Button as MaterialButton, Box, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Snackbar } from '@material-ui/core';
import { Text } from './user/Text';

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

    return (
        <Box className={classes.root} px={1} py={1} mt={0} mb={3} bgcolor="#1B1B1B">
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
                            onClick={() => {
                                const json = query.serialize();
                                copy(lz.encodeBase64(lz.compress(json)));
                                setSnackbarMessage("State copied to clipboard")
                            }}
                        >
                            Copy current state
                    </MaterialButton>
                        <MaterialButton
                            className={classes.exportButton}
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={() => setDialogOpen(true)}
                        >
                            Load
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
                        <Typography style={{color: '#f50057', margin: '0 auto'}}>DRAG TO ADD</Typography>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button key='Text' ref={ref => connectors.create(ref, <Text />)}>
                            <ListItemIcon>
                                <TextIcon />
                            </ListItemIcon>
                            <ListItemText primary='Text' />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
        </Box>
    );
}
