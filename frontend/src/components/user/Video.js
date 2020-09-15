import React, { useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { IconButton, Button, TextField, Tooltip, Typography } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ReactPlayer from 'react-player/lazy';
import './Video.css';


export const Video = ({ url }) => {
    const { connectors: { connect, drag }, parent } = useNode((node) => ({
        parent: node.data.parent
    }));
    const { actions, query, connectors } = useEditor();
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));

    return (
        <div className="video-div"
            ref={ref => connect(drag(ref))}
            onClickCapture={(e) => (e.stopPropagation())}
            style={{ position: 'relative', width: '100%', height: '100%' }}>
            {enabled ? (
                <div>
                    <Tooltip title="Drag" placement="left">
                        <IconButton className="edit-video-btn">
                            <DragHandleIcon ref={ref => connect(drag(ref))} className="edit-video-icon" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Video" placement="bottom">
                        <IconButton
                            className="edit-video-btn"
                            onClick={() => {
                                actions.selectNode(parent)
                            }}>
                            <EditIcon className="edit-video-icon" />
                        </IconButton>
                    </Tooltip>
                </div>
            ) : null}
            <ReactPlayer
                className="youtube-player"
                url={url}
                config={{
                    youtube: {
                        playerVars: { modestBranding: 1 }
                    }
                }}
                style={{ position: 'absolute', top: 0, left: 0 }}
            />
        </div >
    );
};


const VideoSettings = () => {
    const { url, actions: { setProp } } = useNode(node => ({
        url: node.data.props.url
    }));

    const changeVideo = (e) => {
        e.preventDefault();
        setProp(props => props.url = videoId)
    }

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
            <form onSubmit={(e) => changeVideo(e)} noValidate>
                <Typography id="settings-label" variant="body2" gutterBottom>
                    VIDEO URL
                </Typography>
                <TextField
                    // inputProps={{
                    //     className: classes.input
                    // }}
                    variant="outlined"
                    margin="dense"
                    id="videoUrl"
                    name="VIDEO URL"
                    onChange={e => setVideoId(e.target.value)}
                    style={{ borderRadius: '8px 0 0 8px' }}
                />
                <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="secondary"
                    fullWidth={false}
                    style={{ marginTop: '7px', height: '40px', borderRadius: '0 8px 8px 0' }}
                // className={classes.submit}
                >
                    CHANGE
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