import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useNode } from '@craftjs/core';
import Fab from '@material-ui/core/Fab';

export const FreeDrag = () => {
    const { connectors: { connect } } = useNode();

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setX(x - 10);
    };

    const adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setY(y - 10);
    };

    const controlledPosition = (x, y)

    const onControlledDrag = (e, position) => {
        const { x, y } = position;
        setX(x);
        setY(y);
    };

    return (
        <Draggable position={controlledPosition} onDrag={onControlledDrag}>
            <div ref={connect} className="box">
                My position can be changed programmatically. <br />
            I have an onDrag handler to sync state.
            <div>
                    <a href="#" onClick={adjustXPos}>Adjust x ({x})</a>
                </div>
                <div>
                    <a href="#" onClick={adjustYPos}>Adjust y ({y})</a>
                </div>
            </div>
        </Draggable>
    )
};