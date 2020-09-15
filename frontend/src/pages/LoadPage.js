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

export default function LoadPage() {


    const theme = createMuiTheme({
        palette: {
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

    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/pages`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(res => renderPages(res))

        // .then(result => lz.decompress(lz.decodeBase64(result)))
        // .then(result => setJson(result))
    }, []);

    const userId = JSON.parse(localStorage.getItem('user'))['id'];
    const renderPages = (res) => {
        const filteredPages = res.filter(page => page.user_id === userId)
        setPages(filteredPages)
    };

    const history = useHistory();
    const { username } = useParams('username');
    const selectPage = (page) => {
        console.log(JSON.parse(localStorage.getItem('user'))['id'])
        history.push(`/${username}/pages/${page}`)
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
        <div className='viewport'>
            <ThemeProvider theme={theme}>
                {(pages.length > 0) ? (
                    <Box className='list-center' minWidth={240}>
                        <List>
                            {pages.map(page => {
                                return (
                                    <Box key={page.id} width='inherit' onClick={() => selectPage(page.id)}>
                                        <ListItem className='text list' alignItems='center'>
                                            <ListItemText className='text list'
                                                secondary={`${page.created_at.split('T')[0]}`}
                                            >
                                                {`${page.title}`}
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
                                        <p className='nothing-paragraph'>Try exporting a page!</p>
                                    </div>
                                )
                            }, 2000)}
                        </div>)}
            </ThemeProvider>
        </div>
    );
};