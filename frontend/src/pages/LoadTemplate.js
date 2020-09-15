import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { useArrowWhiteButtonStyles } from '@mui-treasury/styles/button/arrowWhite';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
// import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import StyledButton from '../components/styled/StyledButton';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './LoadTemplate.css';
import '../components/filters/FilmGrain.css';
import PhotoPage from '../assets/templates/PhotoPage.png';
import ProductPage from '../assets/templates/ProductPage.png';
import NewTemplate from '../assets/templates/NewTemplate.png';

export default function LoadTemplate() {
    const history = useHistory();
    const user = (JSON.parse(localStorage.getItem('user')))['username']
    const classes = useArrowWhiteButtonStyles();
    const gutterStyles = usePushingGutterStyles({
        firstExcluded: true,
        space: 2,
    });

    const [id, setId] = useState(1);

    const handleLeftArrow = () => {
        if (id > 1) {
            setId(id - 1)
        }
    };

    const handleRightArrow = () => {
        if (id < 3) {
            setId(id + 1)
        }
    };

    const renderTemplate = () => {
        history.push(`/${user}/templates/${id}/edit`);
        setId(1);
    };
    console.log(id)

    return (
        <div>
            <Box className='viewport film-grain'>
                <CarouselProvider
                    visibleSlides={1}
                    totalSlides={3}
                    step={1}
                    naturalSlideWidth={2047}
                    naturalSlideHeight={1064}
                    hasMasterSpinner
                >
                    <h2
                        className='headline'
                        style={{ fontFamily: 'raleway', fontSize: 44, color: '#F0F5F3', letterSpacing: '2.5px', fontVariant: 'small-caps' }}>
                        template {id}
                    </h2>
                    <Box className={gutterStyles.parent}  >
                        <Box className='container' style={{ marginTop: '300px' }}>
                            <Slider id='content' className='slider'>
                                <Slide index={0} onFocus={() => setId(1)}><Image src={NewTemplate} hasMasterSpinner /></Slide>
                                <Slide index={1} onFocus={() => setId(2)}><Image src={PhotoPage} hasMasterSpinner /></Slide>
                                <Slide index={2} onFocus={() => setId(3)}><Image src={ProductPage} hasMasterSpinner /></Slide>
                            </Slider>
                        </Box>
                        <ButtonBack className='buttonBack' onClick={handleLeftArrow}>
                            <Button style={{ visibility: 'visible' }} classes={classes}>
                                <KeyboardArrowLeft />
                            </Button>
                        </ButtonBack>
                        <ButtonNext className='buttonNext' onClick={handleRightArrow}>
                            <Button style={{ visibility: 'visible' }} classes={classes}>
                                <KeyboardArrowRight />
                            </Button>
                        </ButtonNext>
                    </Box>
                </CarouselProvider>
                <span id='load-btn'><StyledButton label="LOAD" fullWidth={true} size='large' onClick={() => renderTemplate()} /></span>
            </Box>
        </div>
    )
}
