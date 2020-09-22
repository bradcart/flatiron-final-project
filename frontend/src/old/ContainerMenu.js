import React from 'react';
import { useEditor } from '@craftjs/core';

export const ContainerMenu = () => {
    const { actions, selected } = useEditor((state) => {
        const currentNodeId = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.displayName,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings
            };
        }

        return {
            selected
        }
    });


    return selected && selected.name === 'Frame' ? (
        <div>
            {console.log(selected)}
            {selected.settings && React.createElement(selected.settings)
            }
        </div>
    ) : null
}