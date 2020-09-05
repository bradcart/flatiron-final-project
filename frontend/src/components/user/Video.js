import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { FormControl, FormLabel, Input } from '@material-ui/core';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/lazy';

export const Video = () => {


    const { connectors: { connect }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));



    return (
        <div style={{width: '680px'}} ref={connect}>
            <ReactPlayer
                url="https://www.youtube.com/watch?v=rNLKPXVQp_k"
            />
        </div>
    );
};

const VideoSettings = () => {
    // just trying to get the settings panel to render something
    return (
        <div>
            <h1>HELLO WORLD</h1>
        </div>
    )
};

Video.craft = {
    displayName: "Video",
    related: {
        settings: VideoSettings
    }
};