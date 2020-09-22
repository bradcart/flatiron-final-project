import React, { useState } from 'react';
import { Typography, TextField, FormControl, Button, Slider, Divider, FormControlLabel, Checkbox, ButtonGroup } from '@material-ui/core';
import { useNode, Element } from '@craftjs/core';

export const ImageContainer = ({
    children,
    width,
    height,
    left,
    top,
    justifyContent,
    alignItems,
    border,
    borderColor,
    borderRadius,
    background,
    backgroundPosition
}) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <div
            ref={ref => connect(drag(ref))}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                boxSizing: "border-box",
                position: "absolute",
                left: left,
                top: top,
                display: "flex",
                justifyContent: justifyContent,
                alignItems: alignItems,
                border: border,
                borderColor: borderColor,
                borderRadius: borderRadius,
                backgroundImage: "url(" + background + ")",
                backgroundSize: "cover",
                backgroundPosition: backgroundPosition,
                backgroundRepeat: "no-repeat",
            }}>
            {/* <Element
                is="div"
                id="img-container"
                // canvas
                // display="flex"
                // position="absolute"
                // width='800px'
                // height="100%"
                // left={left}
                // top={top}
                // flexWrap="wrap"
                // boxSizing="border-box"
                // justifyContent={justifyContent}
                // alignItems={alignItems}
                // border={border}
                // borderColor={borderColor}
                // borderRadius={borderRadius}
                style={{ width: 'inherit', height: 'inherit' }}
                canvas
            > */}
            {children}
            {/* </Element> */}
        </div>
    )
};

const ImageContainerSettings = () => {
    const { background, width, height, right, left, top, bottom, border, borderColor, actions: { setProp } } = useNode(node => ({
        background: node.data.props.background,
        width: node.data.props.width,
        height: node.data.props.height,
        borderRadius: node.data.props.borderRadius,
        border: node.data.props.border,
        borderColor: node.data.props.borderColor,
        justifyContent: node.data.props.justifyContent,
        alignItems: node.data.props.alignItems,
        right: node.data.props.right,
        left: node.data.props.left,
        top: node.data.props.top,
        bottom: node.data.props.bottom,
        backgroundPosition: node.data.props.backgroundPosition
    }))

    const [checked, toggleChecked] = useState(false);
    const [rounded, toggleRounded] = useState(false);

    const handleChecked = () => {
        if (checked === true) {
            toggleChecked(false)
            setProp(props => props.border = 0)
        } else {
            toggleChecked(true)
            setProp(props => props.border = 1)
        }
    };

    const handleRounded = () => {
        if (rounded === true) {
            toggleRounded(false)
            setProp(props => props.borderRadius = '0')
        } else {
            toggleRounded(true)
            setProp(props => props.borderRadius = '50%')
        }
    };

    const handlePosition = (string) => {
        setProp(props => props.backgroundPosition = string)
    };

    const handleJustify = (string) => {
        setProp(props => props.justifyContent = string)
    };

    const handleAlign = (string) => {
        setProp(props => props.alignItems = string)
    };

    const [imageId, setImageId] = useState('')

    const changeImage = (e) => {
        e.preventDefault();
        setProp(props => props.background = imageId)
    }

    return (
        <div>
            <form onSubmit={(e) => changeImage(e)} noValidate>
                <Typography id="settings-label" variant="body2" gutterBottom>
                    IMAGE URL
                </Typography>
                <TextField
                    // inputProps={{
                    //     className: classes.input
                    // }}
                    variant="outlined"
                    margin="dense"
                    id="songUrl"
                    name="SONG URL"
                    onChange={e => setImageId(e.target.value)}
                />
                <Button
                    type="submit"
                    size="medium"
                    variant="outlined"
                    color="primary"
                    fullWidth={false}
                    style={{ marginTop: '7px' }}
                // className={classes.submit}
                >
                    CHANGE
                </Button>
            </form>
            <Divider style={{ marginTop: '15px' }} />
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    WIDTH
                </Typography>
                <Slider min={210} max={2570} value={width} valueLabelDisplay="auto" onChange={(_, value) => setProp(props => props.width = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    HEIGHT
                </Typography>
                <Slider min={192} max={1920} value={height} onChange={(_, value) => setProp(props => props.height = value)} />
            </FormControl>
            <Divider />
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    LEFT/RIGHT
                </Typography>
                <Slider min={-400} max={1920} value={left} onChange={(_, value) => setProp(props => props.left = value)} />
            </FormControl>
            <FormControl fullWidth={true} margin="normal" component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>
                    UP/DOWN
                </Typography>
                <Slider min={-200} max={2500} value={top} onChange={(_, value) => setProp(props => props.top = value)} />
            </FormControl>
            <Divider />
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={() => handleChecked()} name="checked" />}
                label={<Typography id="settings-label" variant="body2" gutterBottom>BORDER</Typography>}
            />

            <FormControlLabel
                control={<Checkbox checked={rounded} onChange={() => handleRounded()} name="checked" />}
                label={<Typography id="settings-label" variant="body2" gutterBottom>CIRCLE</Typography>}
            />
            <Divider style={{ marginBottom: '8px' }} />
            <Typography id="settings-label" variant="body2" gutterBottom>
                POSITION IMAGE
            </Typography>
            <ButtonGroup fullWidth size="small" aria-label="contained secondary button group" style={{ marginBottom: '20px' }}>
                <Button variant="contained" onClick={() => handlePosition('center bottom')}>BOTTOM</Button>
                <Button variant="contained" onClick={() => handlePosition('center')}>CENTER</Button>
                <Button variant="contained" onClick={() => handlePosition('center top')}>TOP</Button>
            </ButtonGroup>
            <Typography id="settings-label" variant="body2" gutterBottom>
                JUSTIFY CONTENT
            </Typography>
            <ButtonGroup fullWidth size="small" aria-label="contained secondary button group" style={{ marginBottom: '20px' }}>
                <Button variant="contained" onClick={() => handleJustify('flex-start')}>LEFT</Button>
                <Button variant="contained" onClick={() => handleJustify('center')}>CENTER</Button>
                <Button variant="contained" onClick={() => handleJustify('flex-end')}>RIGHT</Button>
            </ButtonGroup>
            <Typography id="settings-label" variant="body2" gutterBottom>
                ALIGN ITEMS
            </Typography>
            <ButtonGroup fullWidth size="small" aria-label="contained secondary button group" style={{ marginBottom: '10px' }}>
                <Button variant="contained" onClick={() => handleAlign('flex-end')}>BOTTOM</Button>
                <Button variant="contained" color="default" onClick={() => handleAlign('center')}>CENTER</Button>
                <Button variant="contained" onClick={() => handleAlign('flex-start')}>TOP</Button>
            </ButtonGroup>

        </div>
    )
};

export const ImageContainerDefaultProps = {
    width: 750,
    height: 750,
    top: 0,
    left: 0,
    background: "https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundPosition: 'center'
};

ImageContainer.craft = {
    displayName: "Image",
    props: ImageContainerDefaultProps,
    related: {
        settings: ImageContainerSettings
    }
}

