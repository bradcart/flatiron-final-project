import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import { useHistory, useParams } from "react-router-dom";


export default function Dashboard() {
    const history = useHistory();
    // const user = JSON.parse(localStorage.getItem('user'))
    // const username = user['username']

    let { username } = useParams();


    const viewTemplates = () => {
        history.push(`/${username}/templates`);
    };

    const viewPages = () => {
        history.push(`/${username}/pages`);
    }

    // const logOut = () => {
    //     history.replace("/")
    // }

    const handleLogout = () => {
        history.push('/');
        localStorage.clear();
    }

    const colWidth = { xs: 4 };
    const borderColor = 'grey.500';
    const styles = useGutterBorderedGridStyles({ borderColor, height: '80%' });
    return (
        <div style={{ position: 'relative' }}>
            <Box className='viewport' style={{ display: 'relative' }} width={{ xs: '100%' }}>
                <a className='text log-out' onClick={() => handleLogout()}>LOG OUT</a>
                <Grid className='center' container justify={'center'}>
                    <Grid item {...colWidth} classes={styles}>
                        <Box textAlign={'center'} {...colWidth}>
                            <button className='btn' onClick={viewTemplates}>
                                <h2 className='text'>templates</h2>
                            </button>
                        </Box>
                    </Grid>
                    <Grid item {...colWidth} classes={styles}>
                        <Box textAlign={'center'} {...colWidth}>
                            <button className='btn' onClick={viewPages}>
                                <h2 className='text'>my pages</h2>
                            </button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};