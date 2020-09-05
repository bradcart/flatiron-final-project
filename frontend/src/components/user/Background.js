import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { sizing, display, borders, flexbox } from '@material-ui/system';
import { Element } from '@craftjs/core';

export const Background = ({ children }) => {
    <Box width='80vw' height='80vh' >
        <Element is={Grid} container>
            {children}
        </Element>
    </Box>
}