import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from "react-router";
import { Grid } from '@material-ui/core';
import { Editor, Frame, Element } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import { Box } from '@material-ui/core';
import { SocialLink } from '../components/user/SocialLink';
import { EventList } from '../components/user/EventList';
import { SettingsPanel } from '../components/editor/SettingsPanel';
import { MiniDrawer } from '../components/editor/MiniDrawer';
import { Container } from '../components/user/Container';
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
    const [title, setTitle] = useState('');
    const location = useLocation();
    const { id } = useParams('id');
    useEffect(() => {
        location.pathname.includes('templates') ? (
            fetch(`http://localhost:3000/templates/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(res => handleResponse(res))
        ) : (
                fetch(`http://localhost:3000/projects/${id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(res => handleResponse(res))
            )
    }, [location]);

    const handleResponse = (res) => {
        setTitle(res["title"]);
        const identifier = lz.decompress(lz.decodeBase64(res["identifier"]));
        setJson(identifier);
    }



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

    // const [pageView, togglePageView] = useState(false);

    // const handlePageView = () => {
    //     console.log('handling page view')
    //     togglePageView(!pageView)
    // };

    // useEffect(() => {
    //     console.log(pageView)
    // }, [pageView])

    return (
        <div style={{ position: 'relative', margin: '0 auto', minHeight: '100vh', width: '100vw', backgroundImage: "url(" + Background + ")", backgroundSize: 'auto', backgroundRepeat: 'repeat' }}>
            <Editor resolver={{ Card, Button, Text, Heading, SocialLink, EventList, Container, CardTop, CardBottom, Video, Song, FreeDrag, StyledBox, GridRow, GridCell, AutoGrid, Landing, DragBox, ImageContainer }}>
                <MiniDrawer title={title} />
                {(json !== null) ? (
                    <Frame json={json}>
                        <Element is={Container} canvas width='80vw'>
                        </Element>
                    </Frame>
                ) : null}
                <SettingsPanel />
            </Editor>
        </div >
    )
};