import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import './LoadTemplate.css';
import '../components/filters/FilmGrain.css';
import TexturedPaper from '../assets/textures/textured_paper.png';

export default function LoadProject() {


    const theme = createMuiTheme({
        palette: {
            primary: {
                main: 'rgba(240, 245, 243, 0.6)'
            },
            text: {
                primary: {
                    main: 'rgb(240, 245, 243)',
                },
                secondary: {
                    main: 'rgb(240, 245, 243)',
                },
            },
        }
    });

    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         minWidth: 0,
    //         minHeight: 42,
    //         flexGrow: 1,
    //         margin: 0,
    //         fontSize: '60px',
    //         fontFamily: 'Raleway',
    //         color: theme.palette.text.secondary.main,
    //         '&:hover': {
    //             backgroundColor: theme.palette.grey[100],
    //             color: theme.palette.text.primary,
    //         },
    //     },
    //     selected: {
    //         '&.Mui-selected': {
    //             backgroundColor: 'transparent',
    //             color: theme.palette.text.secondary,
    //             fontWeight: 500,
    //             '&:hover, &:focus': {
    //                 backgroundColor: theme.palette.grey[100],
    //             },
    //         },
    //     },
    // }));

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/projects`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(res => renderProjects(res))

        // .then(result => lz.decompress(lz.decodeBase64(result)))
        // .then(result => setJson(result))
    }, []);

    const userId = JSON.parse(localStorage.getItem('user'))['id'];
    const renderProjects = (res) => {
        const filteredProjects = res.filter(project => project.user_id === userId)
        setProjects(filteredProjects)
    };

    const history = useHistory();
    const { username } = useParams('username');
    const selectProject = (project) => {
        console.log(JSON.parse(localStorage.getItem('user'))['id'])
        history.push(`/${username}/projects/${project}/edit`)
    }

    //     <ListItem alignItems="flex-start">
    //     <ListItemAvatar>
    //       <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    //     </ListItemAvatar>
    //     <ListItemText
    //       primary="Brunch this weekend?"
    //       secondary={
    //         <React.Fragment>
    //           <Typography
    //             component="span"
    //             variant="body2"
    //             className={classes.inline}
    //             color="textPrimary"
    //           >
    //             Ali Connors
    //           </Typography>
    //           {" — I'll be in your neighborhood doing errands this…"}
    //         </React.Fragment>
    //       }
    //     />
    //   </ListItem>

    // const classes = useStyles();
    return (
        <div className='viewport film-grain'>
            <div style={{ position: 'absolute', height: '100vh', width: '100vw', backgroundImage: "url(" + TexturedPaper + ")", backgroundSize: 'auto', backgroundRepeat: 'repeat', mixBlendMode: 'overlay', opacity: 0.9 }} />
            <a className='text log-out' onClick={() => history.goBack()}>BACK</a>
            <ThemeProvider theme={theme}>
                {(projects.length > 0) ? (
                    <Box className='list-center' minWidth='22%' maxWidth='30%' maxHeight='75%' overflow='auto' borderColor="primary.main">
                        <h2 className='pages-header'>{username}'s projects</h2>
                        <List style={{ padding: 0 }}>
                            {projects.map(project => {
                                return (
                                    <Box key={project.id} className='list-box' width='inherit' onClick={() => selectProject(project.id)}>
                                        <ListItem className='label-text' alignItems='center'>
                                            <ListItemText
                                                disableTypography
                                                className='list-item-container'
                                                secondary={<span className='list-secondary-text' id='page-item'>{project.created_at.split('T')[0]}</span>}
                                            >
                                                <span className='list-text' id='page-item'>{project.title}</span>
                                                {console.log(project.created_at)}
                                            </ListItemText>
                                        </ListItem>
                                    </Box>
                                )
                            })}
                        </List>
                    </Box>
                ) : (
                        <div className='list-center'>
                            {setTimeout(() => {
                                return (
                                    <div>
                                        <h2 className='nothing-header'>there seems to be nothing here.</h2>
                                        <p className='nothing-paragraph'>Try creating a project! Start by choosing a template to build on.</p>
                                    </div>
                                )
                            }, 2000)}
                        </div>)}
            </ThemeProvider>
        </div>
    );
};