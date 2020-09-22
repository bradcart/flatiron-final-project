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
import TexturedPaper from '../assets/textures/textured_paper.png';

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

    return (
        <div className='viewport film-grain'>
            <div style={{ position: 'absolute', height: '100vh', width: '100vw', backgroundImage: "url(" + TexturedPaper + ")", backgroundSize: 'auto', backgroundRepeat: 'repeat', mixBlendMode: 'overlay', opacity: 0.8 }} />
            <a className='text log-out' onClick={() => history.goBack()}>BACK</a>
            <CarouselProvider
                visibleSlides={1}
                totalSlides={3}
                step={1}
                naturalSlideWidth={4094}
                naturalSlideHeight={2128}
                hasMasterSpinner
                dragEnabled={false}
                touchEnabled={false}
            >
                <h2
                    className='headline'
                    style={{ fontFamily: 'raleway', fontSize: 44, color: '#F0F5F3', letterSpacing: '2.5px', fontVariant: 'small-caps', cursor: 'default' }}>
                    {(id === 1) ? 'new' : (id === 2) ? 'portfolio' : (id === 3) ? 'product' : null}
                </h2>
                <p
                    className='headline'
                    style={{ fontFamily: 'raleway', color: '#F0F5F3', letterSpacing: '2px', paddingTop: '10px', textAlign: 'center' }}
                >
                    {(id === 1) ? 'start from scratch.' : (id === 2) ? 'showcase your projects.' : (id === 3) ? 'advertise your brand.' : null}
                </p>
                <Box className={gutterStyles.parent}>
                    <Box className='container' style={{ marginTop: '300px' }}>
                        <Slider id='content' className='slider'>
                            <Slide index={0} onFocus={() => setId(1)}><Image src={NewTemplate} hasMasterSpinner /></Slide>
                            <Slide index={1} onFocus={() => setId(2)}><Image src={PhotoPage} hasMasterSpinner /></Slide>
                            <Slide index={2} onFocus={() => setId(3)}><Image src={ProductPage} hasMasterSpinner /></Slide>
                        </Slider>
                    </Box>
                    <ButtonBack className='buttonBack' onClick={handleLeftArrow}>
                        <Button style={{ visibility: 'visible', opacity: `${id === 1 ? 0 : 1}`, transition: '0.5s' }} disabled={id === 1} classes={classes}>
                            <KeyboardArrowLeft />
                        </Button>
                    </ButtonBack>
                    <ButtonNext className='buttonNext' onClick={handleRightArrow}>
                        <Button style={{ visibility: 'visible', opacity: `${id === 3 ? 0 : 1}`, transition: '0.5s' }} classes={classes}>
                            <KeyboardArrowRight />
                        </Button>
                    </ButtonNext>
                </Box>
            </CarouselProvider>
            <span id='load-btn'><StyledButton fullWidth={true} size='large' onClick={() => renderTemplate()}><strong>LOAD</strong></StyledButton></span>
        </div>
    )
}
