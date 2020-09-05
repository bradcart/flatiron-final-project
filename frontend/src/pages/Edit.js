import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { Paper, Grid, Box } from '@material-ui/core';
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
import { StyledBox } from '../components/styled/StyledBox';
// import Backdrop from '../components/styled/StyledBackdrop';
import Background from '../assets/gray-texture2.png';
import lz from "lzutf8";
import PageView from './PageView';
// import './components/filters/FilmGrain.css';
import './Edit.css';

export default function Edit() {
    // const [enabled, setEnabled] = useState(true);
    const [json, setJson] = useState(null);
    // const [viewPage, toggleViewPage] = useState(false);
    // const [page, setPage] = useState('');
    // const [pageId, setPageId] = useState(null);
    const [xHeight, setXHeight] = useState('100vh');
    const [xWidth, setXWidth] = useState('75vw');
    const [xProps, setXProps] = useState(false);

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

    const handleExport = () => {
        setXHeight('100vh');
        setXWidth('100vw');
    }

    // const scaleToPage = (el) => {
    //     return (
    //         <div style={{ transform: 'scale(0.75)', WebkitTransform: 'scale(0.75)' }}>
    //             {el}
    //         </div>
    //     )
    // };

    return (
        <div style={{ margin: "0 auto", overflowX: 'hidden', minHeight: '100vh', backgroundImage: "url(" + Background + ")", backgroundSize: 'auto', backgroundRepeat: 'repeat' }}>
            <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom, Video, FreeDrag, StyledBox }}>
                <Grid className='resize-container' container wrap='nowrap'>
                    <Grid item xs={2}>
                        <MiniDrawer />
                    </Grid>
                    <Grid item xs>
                        {(json !== null) ? (
                            <Grid className='frame-container' container>
                                <Frame json={json}>
                                    <Element is={Container} className='scroll-container' minWidth='80vw' minHeight='80vh' padding='0' background="#FFFFFF" canvas>
                                    </Element>
                                </Frame>
                            </Grid>
                        ) : null}
                    </Grid>
                    <Grid item xs={2}>
                        <Paper style={{ marginLeft: '20px' }}>
                            {/* <Toolbox /> */}
                            <SettingsPanel />
                        </Paper>
                    </Grid>
                </Grid>
            </Editor>
        </div>
    )
};