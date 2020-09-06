import React, { useState } from 'react';

export const DragHandler = () => {
    const [x, setX] = useState(100);
    const [y, setY] = useState(100);
    const styles = {
        transform: `translate(${x}px, ${y}px)`
    };

    return (
        <div style={styles}>
            
        </div>
    )
    
}