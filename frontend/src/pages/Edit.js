import React from 'react';
import { Typography, Paper, Grid, Divider } from '@material-ui/core';
import { Editor, Frame, Element } from "@craftjs/core";
import { Toolbox } from '../components/Toolbox';
import { SettingsPanel } from '../components/SettingsPanel';
import { MiniDrawer } from '../components/MiniDrawer';
import { Topbar } from '../components/Topbar';
import { Container } from '../components/user/Container';
import { Button } from '../components/user/Button';
import { Card, CardTop, CardBottom } from '../components/user/Card';
import { Text } from '../components/user/Text';
import Background from '../assets/gray-texture2.png';

export default function Edit() {
    return (
        <div style={{ margin: "0 auto", backgroundImage: "url(" + Background + ")", backgroundPosition: 'center', backgroundSize: 'auto', height: '100vh', backgroundRepeat: 'repeat' }}>
            <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}>
            <MiniDrawer />
                <Grid container wrap='nowrap'>
                    <Grid item xs={2} md={3} width="100%">
                    {/* space filler */}
                    </Grid>
                    <Grid item xs>
                        <Frame>
                            <Element is={Container} width="800px"  height="auto" minHeight="1000px" margin="auto" marginTop='5vh' padding={40} background="#eee" canvas>
                                <Card />
                                <Button size="small" variant="outlined">Click</Button>
                                <Text size="small" text="Hi world!" />
                                <Element is={Container} padding={2} background="#999" canvas>
                                    <Text size="small" text="It's me again!" />
                                </Element>
                            </Element>
                        </Frame>
                    </Grid>
                    <Grid item xs={2} md={3}>
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