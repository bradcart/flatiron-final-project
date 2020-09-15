import React from 'react';
import { StyledBox as Box, StyledBoxSettings } from '../styled/StyledBox';
import { useNode, Element } from '@craftjs/core';


export const Image = ({
    children,
    background,
    width,
    height,
    right,
    left,
    top,
    bottom,
    border,
    borderColor,
    borderRadius,
    justifyContent,
    alignItems
}) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <Box
            ref={ref => connect(drag(ref))}
            display="inline-flex"
            position="absolute"
            right={right}
            left={left}
            top={top}
            bottom={bottom}
            flexWrap="wrap"
            boxSizing="border-box"
            justifyContent={justifyContent}
            alignItems={alignItems}
            border={border}
            borderColor={borderColor}
            borderRadius={borderRadius}
        >
            <img src="https://sc-schemes.s3.amazonaws.com/13292/header_image.jpg"
                alt="User Generated"
                style={{ position: 'relative' }}
                width={width}
                height={height} />
            <Element id="content" canvas>
                <h2>drop stuff here</h2>
            </Element>
        </Box>
    )
}

Image.craft = {
    displayName: "Image",
    related: {
        settings: StyledBoxSettings
    }
}