import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { Paper, Grid } from '@material-ui/core';
import { Editor, Frame, Element } from "@craftjs/core";
import { SettingsPanel } from '../components/SettingsPanel';
import { MiniDrawer } from '../components/MiniDrawer';
import { Container } from '../components/user/Container';
import { Button } from '../components/user/Button';
import { Card, CardTop, CardBottom } from '../components/user/Card';
import { Text } from '../components/user/Text';
import { Page } from '../components/user/Page';
import { Video } from '../components/user/Video';
import { FreeDrag } from '../components/design/FreeDrag';
// import Backdrop from '../components/styled/StyledBackdrop';
import Background from '../assets/gray-texture2.png';
import lz from "lzutf8";
import PageView from './PageView';
// import './components/filters/FilmGrain.css';



export default function Edit() {
    // const [enabled, setEnabled] = useState(true);
    const [json, setJson] = useState(null);
    // const [viewPage, toggleViewPage] = useState(false);
    // const [page, setPage] = useState('');
    // const [pageId, setPageId] = useState(null);

    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/templates/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(res => res["identifier"])
            .then(result => lz.decompress(lz.decodeBase64(result)))
            .then(result => setJson(result))
    }, []);





    return (
        <div style={{ margin: "0 auto", backgroundImage: "url(" + Background + ")", backgroundSize: 'auto', backgroundRepeat: 'repeat' }}>
            <Editor resolver={{ Page, Card, Button, Text, Container, CardTop, CardBottom, Video, FreeDrag }}>
                <MiniDrawer />
                <Grid container wrap='nowrap'>
                    <Grid item xs={2} md={3} width="100%">
                        {/* space filler */}
                    </Grid>
                    <Grid item xs>
                        {(json !== null) ? (
                            <Frame json={json}>
                                <Element is={Container} minWidth="75vw" minHeight="85vh" marginTop='5vh' padding={40} background="#FFFFFF" overflow="hidden" canvas>
                                </Element>
                            </Frame>
                        ) : null}
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
    )
};