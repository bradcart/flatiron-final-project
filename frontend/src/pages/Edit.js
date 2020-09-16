import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Grid } from '@material-ui/core';
import { Editor, Frame, Element } from "@craftjs/core";
import { SettingsPanel } from '../components/SettingsPanel';
import { MiniDrawer } from '../components/MiniDrawer';
import { Container } from '../components/user/Container';
import { ContainerMenu } from '../components/user/ContainerMenu';
import { Button } from '../components/user/Button';
import { Card, CardTop, CardBottom } from '../components/user/Card';
import { Text } from '../components/user/Text';
import { Heading } from '../components/user/Heading/Heading';
import { Video } from '../components/user/Video';
import { Song } from '../components/user/Song';
import { ImageContainer } from '../components/user/ImageContainer';
import { FreeDrag } from '../components/design/FreeDrag';
import DragBox from '../components/design/DragBox';
import { StyledBox } from '../components/styled/StyledBox';
import { GridRow } from '../components/layout/GridRow';
import { GridCell } from '../components/layout/GridCell';
import AutoGrid from '../components/layout/AutoGrid';
import { Landing } from '../components/layout/Landing';
// import Backdrop from '../components/styled/StyledBackdrop';
import Background from '../assets/gray-texture2.png';
import lz from "lzutf8";
import './Edit.css';

export default function Edit() {
    // const [enabled, setEnabled] = useState(true);
    const [json, setJson] = useState(null);

    const { id } = useParams('id');
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



    // const useStateWithPromise = (initialState) => {
    //     const [value, setValue] = useState(initialState);
    //     const resolverRef = useRef(null);

    //     useEffect(() => {
    //         if (resolverRef.current) {
    //             resolverRef.current(state);
    //             resolverRef.current = null;
    //         }
    //         /**
    //          * Since a state update could be triggered with the exact same state again,
    //          * it's not enough to specify state as the only dependency of this useEffect.
    //          * That's why resolverRef.current is also a dependency, because it will guarantee,
    //          * that handleSetState was called in previous render
    //          */
    //     }, [resolverRef.current, state]);

    //     const handleSetState = useCallback((stateAction) => {
    //         setState(stateAction);
    //         return new Promise(resolve => {
    //             resolverRef.current = resolve;
    //         });
    //     }, [setState])

    //     return [state, handleSetState];
    // };

    // const handlePageExport = (initialValue = false) => {
    //     const [value, setValue] = useStateWithPromise(initialValue);

    //     const reset = () => {
    //         // this will return a promise containing the updated state
    //         return setValue(initialValue);
    //     }

    //     return {
    //         value,
    //         setValue,
    //         reset
    //     }
    // };

    // const FiltersSidebar = () => {
    //     //...
    //     const [resetted, setResetted] = useState(false)

    //     useEffect(() => {
    //         if (resetted) {
    //             fetchArticles();
    //             setResetted(false);
    //         }
    //     }, [resetted]);

    //     const reset = async () => {
    //         await Promise.all([
    //             colorFilter.reset(),
    //             nameFilter.reset(),
    //             releaseDateFilter.reset()
    //         ]);

    //         setResetted(true);
    //     }

    //     // ...
    // }

    // const scaleToPage = (el) => {
    //     return (
    //         <div style={{ transform: 'scale(0.75)', WebkitTransform: 'scale(0.75)' }}>
    //             {el}
    //         </div>
    //     )
    // };



    return (
        <div style={{ position: 'relative', margin: "auto", minHeight: '100vh', backgroundImage: "url(" + Background + ")", backgroundSize: 'auto', backgroundRepeat: 'repeat' }}>
            <Editor resolver={{ Card, Button, Text, Heading, Container, CardTop, CardBottom, Video, Song, FreeDrag, StyledBox, GridRow, GridCell, AutoGrid, Landing, DragBox, ImageContainer }}>
                <Grid container wrap='nowrap'>
                    <Grid item xs={2}>
                        <MiniDrawer />
                    </Grid>
                    <Grid item xs={12}>
                        {(json !== null) ? (
                            <Grid className='frame-container' container>
                                <Frame json={json}>
                                    <Element is={Container} canvas>

                                    </Element>
                                </Frame>
                            </Grid>
                        ) : null}
                    </Grid>
                    <Grid item xs={2}>
                        <SettingsPanel />
                    </Grid>
                </Grid>
            </Editor>
        </div>
    )
};