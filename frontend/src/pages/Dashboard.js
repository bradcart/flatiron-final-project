import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import { useHistory, useParams } from "react-router-dom";
import '../components/filters/FilmGrain.css';
import TexturedPaper from '../assets/textures/textured_paper.png';
import { ContainerDefaultProps } from '../components/user/Container';


export default function Dashboard() {
    const history = useHistory();
    // const user = JSON.parse(localStorage.getItem('user'))
    // const username = user['username']

    let { username } = useParams();


    const viewTemplates = () => {
        history.push(`/${username}/templates`);
    };

    const viewProjects = () => {
        history.push(`/${username}/projects`);
    }

    const viewPages = () => {
        history.push(`/${username}/pages`);
    };

    // const logOut = () => {
    //     history.replace("/")
    // }

    const handleLogout = () => {
        // localStorage.clear();
        history.push('/');
    }

    const colWidth = { xs: 4 };
    const borderColor = 'grey.500';
    const styles = useGutterBorderedGridStyles({ borderColor, height: '80%' });
    return (
        <div style={{ position: 'relative' }}>
            <Box className='viewport film-grain' style={{ display: 'relative' }} width={{ xs: '100%' }}>
                <div style={{ position: 'absolute', height: '100vh', width: '100vw', backgroundImage: "url(" + TexturedPaper + ")", backgroundSize: 'auto', backgroundRepeat: 'repeat', mixBlendMode: 'overlay', opacity: 0.9 }} />
                {/* <img src={TexturedPaper} style={{ objectFit: 'cover', height: '100vh', width: '100vw', mixBlendMode: 'overlay' }} /> */}
                <a className='text log-out' onClick={() => history.push('/')}>LOG OUT</a>
                <Grid className='center' container justify={'center'}>
                    <Grid item {...colWidth} classes={styles}>
                        <Box textAlign={'center'} {...colWidth}>
                            <button className='btn' id='content' onClick={viewTemplates}>
                                <h2 className='text'>templates</h2>
                                <p className='label-text'>the building blocks for your website.</p>
                            </button>
                        </Box>
                    </Grid>
                    <Grid item {...colWidth} classes={styles}>
                        <Box textAlign={'center'} {...colWidth}>
                            <button className='btn' id='content' onClick={viewProjects}>
                                <h2 className='text'>projects</h2>
                                <p className='label-text'>your works-in-progress.</p>
                            </button>
                        </Box>
                    </Grid>
                    <Grid item {...colWidth} classes={styles}>
                        <Box textAlign={'center'} {...colWidth}>
                            <button className='btn' id='content' onClick={viewPages}>
                                <h2 className='text'>pages</h2>
                                <p className='label-text'>your finished products.</p>
                            </button>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </div>
    );
};