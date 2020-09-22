import React, { useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { IconButton, Button, TextField, Tooltip, Typography } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ReactPlayer from 'react-player/lazy';
import './Media.css';


export const Song = ({ url, color }) => {
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
                    <Tooltip title="Edit Song" placement="bottom">
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
                style={{ position: 'absolute', top: 0, left: 0 }}
            />
        </div >
    );
};


const SongSettings = () => {
    const { url, actions: { setProp } } = useNode(node => ({
        url: node.data.props.url
    }));

    const changeSong = (e) => {
        e.preventDefault();
        setProp(props => props.url = songId)
    }

    const [songId, setSongId] = useState('')

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
            <form onSubmit={(e) => changeSong(e)} noValidate>
                <Typography id="settings-label" variant="body2" gutterBottom>
                    SOUNDCLOUD URL
                </Typography>
                <TextField
                    // inputProps={{
                    //     className: classes.input
                    // }}
                    variant="outlined"
                    margin="dense"
                    id="songUrl"
                    name="SONG URL"
                    onChange={e => setSongId(e.target.value)}
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
            </form>
        </div>
    )
};

Song.craft = {
    props: {
        url: "https://soundcloud.com/big_jackson/love-with-you"
    },
    displayName: "Song",
    related: {
        settings: SongSettings
    }
};