import React, { useState, useEffect } from 'react';
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
import { GridRow } from '../components/layout/GridRow';
import { GridCell } from '../components/layout/GridCell';
// import Backdrop from '../components/styled/StyledBackdrop';
import Background from '../assets/gray-texture2.png';
import lz from "lzutf8";
import PageView from '../pages/PageView';
// import './components/filters/FilmGrain.css';
import './Edit.css';

export default function Edit() {
    // const [enabled, setEnabled] = useState(true);
    const [json, setJson] = useState(null);
    // const [viewPage, toggleViewPage] = useState(false);
    // const [page, setPage] = useState('');
    // const [pageId, setPageId] = useState(null);
    // const [xHeight, setXHeight] = useState('100vh');
    // const [xWidth, setXWidth] = useState('75vw');
    // const [xProps, setXProps] = useState(false);

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

    // const scaleToPage = (el) => {
    //     return (
    //         <div style={{ transform: 'scale(0.75)', WebkitTransform: 'scale(0.75)' }}>
    //             {el}
    //         </div>
    //     )
    // };

    const [exportPage, toggleExportPage] = useState(false);
    const handleExport = () => {
        toggleExportPage(!exportPage)
    };

    return (
        <div style={{ margin: "0 auto", overflowX: 'hidden', minHeight: '100vh', backgroundImage: "url(" + Background + ")", backgroundSize: 'auto', backgroundRepeat: 'repeat' }}>
            <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom, Video, FreeDrag, StyledBox, GridRow, GridCell }}>
                <Grid container spacing={1} wrap='nowrap'>
                    <Grid item xs={2}>
                        <MiniDrawer exportPage={exportPage} />
                    </Grid>
                    <Grid item xs>
                        {(json !== null) ? (
                            <Frame json={json}>
                                <Element is={Box} className="container-paper" canvas>
                                    <Element is={GridRow} width={12} canvas>

                                    </Element>
                                    <Element is={GridRow} width={12} canvas>

                                    </Element>
                                    <Element is={GridRow} width={12} canvas>
                                        <Element is={GridCell} width={4} canvas>

                                        </Element>
                                        <Element is={GridCell} width={4} canvas>

                                        </Element>
                                        <Element is={GridCell} width={4} canvas>

                                        </Element>
                                    </Element>
                                    <Element is={GridRow} width={12} canvas>

                                    </Element>
                                    <Element is={GridRow} width={12} canvas>

                                    </Element>
                                    <Element is={GridRow} width={12} canvas>

                                    </Element>
                                    <Element is={GridRow} width={12} canvas>

                                    </Element>
                                    <Element is={GridRow} width={12} canvas>

                                    </Element>
                                </Element>
                            </Frame>
                        ) : null}
                    </Grid>
                    <Grid item xs={2}>
                        <Paper>
                            {/* <Toolbox /> */}
                            <SettingsPanel />
                        </Paper>
                    </Grid>
                </Grid>
            </Editor>
        </div>
    )
};