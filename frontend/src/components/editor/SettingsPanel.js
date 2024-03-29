import React from 'react';
import { Paper, Chip, Divider, Typography, Button as MaterialButton, Box, Grid, ClickAwayListener, IconButton } from "@material-ui/core";
import Slide from '@material-ui/core/Slide';
import { useEditor } from "@craftjs/core";
import { ThemeProvider } from "@material-ui/styles";
import DragHandleIcon from '@material-ui/icons/DragHandle';
import CancelIcon from '@material-ui/icons/Cancel';
import './SettingsPanel.css'
import EditorTheme from '../themes/EditorTheme';
import Draggable, { DraggableCore } from 'react-draggable';

export const SettingsPanel = () => {
    const { actions, selected } = useEditor((state, query) => {
        const currentNodeId = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.displayName,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
                isDeletable: query.node(currentNodeId).isDeletable()
            };
        }

        return {
            selected
        }
    });

    const handleClickAway = (e) => {
        console.log(e)
    };


    return selected && selected.name !== 'Frame' ? (
        <ThemeProvider theme={EditorTheme}>
            {console.log(selected)}
            {/* <ClickAwayListener mouseEvent="onMouseDown" onClickAway={(e) => handleClickAway(e)}> */}
            <Slide in={Object.keys(selected).length > 0} direction="left">
                <Draggable handle="#handle" >
                    <Paper style={{ position: 'relative', top: '2.5vh', left: '90.2vw', zIndex: 1400, height: '50%', minWidth: '250px', width: '9%', backgroundColor: '#f2f2f2' }}>
                        <Box rbgcolor="rgba(240, 245, 243, 0.06)" px={3} py={1} textAlign="center">
                            <Grid container direction="column">
                                <Grid item>
                                    <Box pb={1}>
                                        <Grid container justify="space-between" alignItems="center" style={{ marginRight: '5px' }}>
                                            <IconButton id="handle" edge='start' style={{ position: 'absolute', left: '8px', top: '0px' }}>
                                                <DragHandleIcon id="handle" />
                                            </IconButton>
                                            <Grid item xs={12}>
                                                <Typography id="settings-label" style={{ paddingTop: '6px' }} variant="body2" gutterBottom>
                                                    SELECTED
                                                </Typography>
                                            </Grid>
                                            <Grid item xs>
                                                <Chip size="small" color="default" label={selected.name} />
                                            </Grid>
                                            <IconButton edge='end' onClick={() => actions.clearEvents()} style={{ position: 'absolute', right: '8px', top: '2px' }}>
                                                <CancelIcon fontSize='small'/>
                                            </IconButton>
                                        </Grid>
                                    </Box>
                                    <Divider style={{ margin: '10px 0' }} />
                                </Grid>
                                {
                                    selected.settings && React.createElement(selected.settings)
                                }
                                {
                                    selected.isDeletable ? (
                                        <div style={{ margin: '10px 0' }}>
                                            <Divider style={{ margin: '10px 0' }} />
                                            <MaterialButton
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => {
                                                    actions.delete(selected.id);
                                                }}>
                                                Delete
                                </MaterialButton>
                                        </div>
                                    ) : null
                                }
                            </Grid>
                        </Box>
                    </Paper>
                </Draggable>
            </Slide>
            {/* </ClickAwayListener> */}
        </ThemeProvider >
    ) : null
}