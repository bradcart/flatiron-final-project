import React, { useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { IconButton, Button, TextField, Tooltip, Typography, FormControl, FormControlLabel, RadioGroup, Radio, Divider } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ReactPlayer from 'react-player/lazy';
import './Media.css';


export const Video = ({ url, size }) => {
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
            style={{ position: 'absolute', width: '50%', height: '50%' }}>
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
            {console.log(size)}
            <ReactPlayer
                className="youtube-player"
                width={size[0]}
                height={size[1]}
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
    const { url, size, actions: { setProp } } = useNode(node => ({
        url: node.data.props.url,
        size: node.data.props.size
    }));

    const [videoId, setVideoId] = useState('');

    const changeVideo = (e) => {
        e.preventDefault();
        setProp(props => props.url = videoId)
    }

    const [checked, setChecked] = useState(1);

    const handleChecked = (value) => {
        if (value == '640px,360px') {
            setChecked(1)
        } else if (value == '854px,480px') {
            setChecked(2)
        } else if (value == '1280px,720px') {
            setChecked(3)
        }
    };

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
                    YOUTUBE URL
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
                />
                <Button
                    type="submit"
                    size="medium"
                    variant="outlined"
                    color="primary"
                    fullWidth={false}
                    style={{ marginTop: '7px' }}
                >
                    CHANGE
                </Button>
                <Divider variant="middle" light style={{ margin: '10px 0' }} />
                <FormControl component="fieldset">
                    <Typography id="settings-label" variant="body2" gutterBottom>SIZE</Typography>
                    <RadioGroup value={size} onChange={(e) => {
                        setProp(props => props.size = e.target.value.split(','))
                        handleChecked(e.target.value)
                    }}>
                        <FormControlLabel label={<Typography variant="body2">Small</Typography>} value={['640px', '360px']} control={<Radio checked={checked === 1 ? true : false} size="small" color="secondary" />} />
                        <FormControlLabel label={<Typography variant="body2">Medium</Typography>} value={['854px', '480px']} control={<Radio checked={checked === 2 ? true : false} size="small" color="secondary" />} />
                        <FormControlLabel label={<Typography variant="body2">Large</Typography>} value={['1280px', '720px']} control={<Radio checked={checked === 3 ? true : false} size="small" color="secondary" />} />
                    </RadioGroup>
                </FormControl>
            </form>
        </div>
    )
};

Video.craft = {
    props: {
        url: "https://www.youtube.com/watch?v=7ybYUcm78mo",
        size: ['640px', '360px']
    },
    displayName: "Video",
    related: {
        settings: VideoSettings
    }
};