import React, { useState, useRef, useMemo } from 'react';
import { useNode } from '@craftjs/core';
import DraggableCore from 'react-draggable';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const DragBox = ({bottom, left, top, right}) => {



    // const [newBottom, setNewBottom] = useState(0);
    // const [newLeft, setNewLeft] = useState(0);
    // const [newTop, setNewTop] = useState(0);
    // const [newRight, setNewRight] = useState(0);



    // const prevBottom = usePrevious(newBottom);
    // const prevLeft = usePrevious(newLeft);
    // const prevTop = usePrevious(newTop);
    // const prevRight = usePrevious(newRight);

    const { connectors: { connect, drag }, actions: { setProp } } = useNode(node => ({
        bottom: node.data.props.bottom,
        left: node.data.props.left,
        top: node.data.props.top,
        right: node.data.props.right
    }));

    // function usePrevious(value) {
    //     const ref = useRef();
    //     useEffect(() => {
    //         ref.current = value;
    //     });
    //     return ref.current;
    // }

    const dragRef = useRef({
        bottom: bottom,
        left: left,
        top: top,
        right: right
    });

    const handleFocus = () => {
        dragRef.current.focus();
    }

    const commitDrag = () => {
        const position = dragRef.current.getBoundingClientRect();

        console.log(dragRef.current);

        setProp(props => props.bottom = position.bottom);
        setProp(props => props.left = position.left);
        setProp(props => props.top = position.top);
        setProp(props => props.right = position.right);

        console.log(bottom)
    }

    const savePosition = useMemo(
        () => commitDrag(bottom, left, top, right), []
    );





    // const updateState = () => {
    //     const position = dragRef.current.getBoundingClientRect();
    //     console.log(position)

    //     setNewBottom(position.bottom);
    //     setNewLeft(position.left);
    //     setNewTop(position.top);
    //     setNewRight(position.right);
    // }



    // const commitDrag = () => {
    //     const position = dragRef.current.getBoundingClientRect();

    //     setProp(props => props.bottom = position.bottom)
    //     setProp(props => props.left = position.left)
    //     setProp(props => props.top = position.top)
    //     setProp(props => props.right = position.right)
    // }


    // useEffect(() => {
    //     commitDrag();
    // })

    //editor props are getting their values from dragRef
    //these props are updating the Box position
    //handleFocus is targeting the element when drag starts
    //handleDrag can be ignored for now
    //updateState is updating the state when dragging stops
    //commitDrag is updating dragRef with new positioning
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const handleDrag = (e, ui) => {
        setPosX(posX + ui.deltaX)
        setPosY(posY + ui.deltaY)
    }


    return (
        <DraggableCore
            onStart={handleFocus}
            onDrag={handleDrag}
            onStop={savePosition}
        >
            <div ref={connect}>
                <div ref={dragRef}>
                    <Box className="drag-box"
                        bottom={bottom}
                        left={left}
                        top={top}
                        right={right}
                        bgcolor='#3fa334'
                        height='200px'
                        width='200px'
                        ref={dragRef => {
                            if (!dragRef) return;
                            // console.log("initial position", dragRef.getBoundingClientRect());
                            let prevValue = JSON.stringify(dragRef.getBoundingClientRect());
                            // const start = Date.now();
                            const handle = setInterval(() => {
                                let nextValue = JSON.stringify(dragRef.getBoundingClientRect());
                                if (nextValue === prevValue) {
                                    clearInterval(handle);
                                    // console.log(
                                    //     `position stopped changing in ${Date.now() - start}ms. final position:`,
                                    //     dragRef.getBoundingClientRect()
                                    // );
                                } else {
                                    prevValue = nextValue;
                                }
                            }, 100);
                        }}
                        style={{ position: 'absolute' }}
                    >
                        <div>Tacking Delta</div>
                        <div>x: {posX.toFixed(0)}, y: {posY.toFixed(0)}</div>
                        <div>b: {bottom},<br /> t: {top},<br /> l: {left},<br /> r: {right}</div>
                        <Button onClick={commitDrag}>
                            commit drag
                    </Button>
                    </Box>
                </div>
            </div>
        </DraggableCore >
    );
}

export default DragBox;



  // const [bottom, setBottom] = useState(0);
    // const [left, setLeft] = useState(0);
    // const [right, setRight] = useState(0);
    // const [top, setTop] = useState(0);

    // state = {
    //     deltaPosition: {
    //         x: 0, y: 0
    //     }
    // };

    // handleDrag = (e, ui) => {
    //     const { x, y } = this.state.deltaPosition;
    //     this.setState({
    //         deltaPosition: {
    //             x: x + ui.deltaX,
    //             y: y + ui.deltaY,
    //         }
    //     });
    // };