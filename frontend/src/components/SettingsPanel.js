import React from 'react';
import { Chip, Divider, Typography, Button as MaterialButton, Box, Grid, ClickAwayListener } from "@material-ui/core";
import { positions, typography } from '@material-ui/system';
import { useEditor } from "@craftjs/core";
import { ThemeProvider } from "@material-ui/styles";
import EditorTheme from './themes/EditorTheme';

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

    return selected ? (
        <ThemeProvider theme={EditorTheme}>
            <ClickAwayListener mouseEvent="onMouseDown" onClickAway={() => actions.clearEvents()}>
                <Box bgcolor="rgba(0, 0, 0, 0.06)" mt={10} px={2} py={2} zIndex="tooltip" textAlign="center">
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Box pb={1}>
                                <Grid container alignItems="center">
                                    <Grid item xs><Typography variant="subtitle1">Selected</Typography></Grid>
                                    <Grid item><Chip size="small" color="default" label={selected.name} /></Grid>
                                </Grid>
                            </Box>
                            <Divider style={{ marginBottom: '10px' }} />
                        </Grid>
                        {
                            selected.settings && React.createElement(selected.settings)
                        }
                        {
                            selected.isDeletable ? (
                                <div>
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
            </ClickAwayListener>
        </ThemeProvider>
    ) : null
}