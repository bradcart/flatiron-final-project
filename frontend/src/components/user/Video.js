import React, { useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { FormControl, FormLabel, Input, InputLabel, FormHelperText, IconButton, InputAdornment, Button, TextField, Tooltip } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/lazy';
import StyledButton from '../styled/StyledButton';
import './Video.css';


export const Video = ({ url }) => {
    const { connectors: { connect, drag }, parent } = useNode((node) => ({
        parent: node.data.parent
    }));
    const { actions, query, connectors } = useEditor();

    return (
        <div onClickCapture={(e) => (e.stopPropagation())} ref={ref => connect(drag(ref))}>
            <Tooltip title="Edit Video" placement="top">
                <Button
                    className="edit-video-icon"
                    onClick={(e) => {
                        actions.selectNode(parent)
                    }}>
                    <EditIcon style={{ color: '#FFFFFF' }} />
                </Button>
            </Tooltip>
            <ReactPlayer
                url={url}
            />
        </div >
    );
};

const VideoSettings = () => {
    const { url, actions: { setProp } } = useNode(node => ({
        url: node.data.props.url
    }));

    const [videoId, setVideoId] = useState('')

    return (
        <div>
            {/* <FormControl>
                <InputLabel htmlFor="video-url">Video URL</InputLabel>
                <Input id="video-url" aria-describedby="video-helper-text" onChange={value => setVid(value)} endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="change video"
                            onClick={setProp(props => props.url = vid)}
                        >
                            <PlayCircleOutlineIcon />
                        </IconButton>
                    </InputAdornment>
                } />
                <FormHelperText id="video-helper-text">Enter a video URL here.</FormHelperText>
            </FormControl> */}
            <form onSubmit={() => setProp(props => props.url = videoId)} noValidate>
                <TextField
                    // inputProps={{
                    //     className: classes.input
                    // }}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="videoId"
                    label="Video ID"
                    name="Video ID"
                    onChange={e => setVideoId(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth={false}
                // className={classes.submit}
                >
                    SUBMIT
                </Button>
            </form>
        </div>
    )
};

Video.craft = {
    props: {
        url: "https://www.youtube.com/watch?v=7ybYUcm78mo"
    },
    displayName: "Video",
    related: {
        settings: VideoSettings
    }
};