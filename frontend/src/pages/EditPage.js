import React from 'react';
import { Typography, Paper, Grid, Divider } from '@material-ui/core';

import { Editor, Frame, Element } from "@craftjs/core";
import { Toolbox } from '../components/Toolbox';
import { SettingsPanel } from '../components/SettingsPanel';
import { Topbar } from '../components/Topbar';
import { Container } from '../components/user/Container';
import { Button } from '../components/user/Button';
import { Card, CardTop, CardBottom } from '../components/user/Card';
import { Text } from '../components/user/Text';

export default function EditPage() {
    return (
        <div style={{ margin: "0 auto", width: "800px" }}>
            <Typography variant="h5" align="center">Flatiron Mod 5</Typography>
            <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Topbar />
                        <Divider component="hr" />
                    </Grid>
                    <Grid item xs>
                        <Frame>
                            <Element is={Container} padding={5} background="#eee" canvas>
                                <Card />
                                <Button size="small" variant="outlined">Click</Button>
                                <Text size="small" text="Hi world!" />
                                <Element is={Container} padding={2} background="#999" canvas>
                                    <Text size="small" text="It's me again!" />
                                </Element>
                            </Element>
                        </Frame>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className='classes-root'>
                            <Toolbox />
                            <SettingsPanel />
                        </Paper>
                    </Grid>
                </Grid>
            </Editor>
        </div>
    );
};