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
import { Page } from '../components/user/Page';
import { Video } from '../components/user/Video';
import Background from '../assets/gray-texture2.png';
// import './components/filters/FilmGrain.css';

export default function Edit() {
    return (
        <div style={{ margin: "0 auto", backgroundImage: "url(" + Background + ")", backgroundPosition: 'center', backgroundSize: 'auto', height: '100vh', backgroundRepeat: 'repeat' }}>
            <Editor resolver={{ Page, Card, Button, Text, Container, CardTop, CardBottom, Video }}>
                <MiniDrawer />
                <Grid container wrap='nowrap'>
                    <Grid item xs={2} md={3} width="100%">
                        {/* space filler */}
                    </Grid>
                    <Grid item xs>
                        <Frame>
                            <Element is={Container} minWidth="75vw" minHeight="85vh" marginTop='5vh' padding={40} background="#FFFFFF" canvas>
                                <Card />
                                <Text size="small" text="Hello world." />
                                <Element is={Container} padding={10} background="#912f40" canvas>
                                    <Text size="small" text="I'm inside a container." color='#FFFFFF' />
                                </Element>
                            </Element>
                        </Frame>
                    </Grid>
                    <Grid item xs={2} md={3}>
                        <Paper className='classes-root'>
                            {/* <Toolbox /> */}
                            <SettingsPanel />
                        </Paper>
                    </Grid>
                </Grid>
            </Editor>
        </div>
    );
};