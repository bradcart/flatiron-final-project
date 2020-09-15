import React from "react";
import { Text } from "./Text";
import { Button } from "./Button";
import { Container, ContainerSettings, ContainerDefaultProps } from "./Container";
import { useNode, Element } from "@craftjs/core";
import { Divider } from "@material-ui/core";
import { StyledBoxSettings } from "../styled/StyledBox";

export const CardTop = ({ children }) => {
    const { connectors: { connect } } = useNode();
    return (
        <div ref={connect} className="text-only" style={{minHeight: '20px'}}>
            {children}
        </div>
    )
}

CardTop.craft = {
    rules: {
        // Only accept Text
        canMoveIn: (incomingNode) => incomingNode.data.type === Text
    }
}

export const CardBottom = ({ children }) => {
    const { connectors: { connect } } = useNode();
    return (
        <div ref={connect}>
            {children}
        </div>
    )
}

CardBottom.craft = {
    rules: {
        // Only accept Buttons
        canMoveIn: (incomingNode) => incomingNode.data.type === Button
    }
}

export const Card = ({ background, padding = 20, width, minHeight }) => {
    return (
        <Container background={background} padding={padding} width={width}>
            <Element id="text" is={CardTop} canvas>
                <Text text="Title." fontSize={24} font='h6' />
            </Element>
            <Divider />
            <Element id="body" is='div' canvas style={{minHeight}}>
                <Text text="Body." fontSize={18} />
            </Element>
            <Divider />
            <Element id="buttons" is={CardBottom} canvas>
                <Button size="small" children="Click me" variant="contained" color="primary" />
            </Element>
        </Container>
    )
}

const CardDefaultProps = {
    background: "#ffffff",
    padding: 10,
    margin: 0,
    width: '22.5vw',
    minHeight: '130px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
};

Card.craft = {
    displayName: "Card",
    props: CardDefaultProps,
    related: {
        settings: StyledBoxSettings
    }
}