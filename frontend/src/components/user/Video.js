import React from 'react';
import { useNode } from '@craftjs/core';
import { FormControl, FormLabel, Input } from '@material-ui/core';
import styled from 'styled-components';
import YouTube from 'react-youtube';

export const Video = ({videoId}) => {
    
    const { connectors: { connect } } = useNode((node) => ({
        selected: node.events.selected,
    }));

    return (
        <div ref={connect}>
            <YouTube
                videoId={videoId}
                opts={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
};

const VideoSettings = () => {
    // just trying to get the settings panel to render something
    return (
            <div>
                <p>HELLO WORLD</p>
            </div>
    )
};

Video.craft = {
    displayName: 'Video',
    props: {
        videoId: 'IwzUs1IMdyQ',
    },
    related: {
        settings: VideoSettings
    },
};