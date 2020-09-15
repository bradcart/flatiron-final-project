import React from 'react';
import { StyledBox } from '../styled/StyledBox';
import { useImage } from 'react-image';
import { useNode } from '@craftjs/core'

export const Picture = ({
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
    background
}) => {

    const MyImage = () => {
        const { src } = useImage({
            srcList: "https://sc-schemes.s3.amazonaws.com/13292/header_image.jpg"
        })
    }
    const { connectors: { connect, drag } } = useNode();

    return (
        <StyledBox
            ref={ref => connect(drag(ref))}
            display="inline-flex"
            position="absolute"
            left={left}
            top={top}
            flexWrap="wrap"
            boxSizing="border-box"
            justifyContent={justifyContent}
            alignItems={alignItems}
            border={border}
            borderColor={borderColor}
            borderRadius={borderRadius}
        >
            {MyImage}
        </StyledBox>
    )
}