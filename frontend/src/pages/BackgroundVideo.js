import React from 'react';
import './BackgroundVideo.css'

export default function BackgroundVideo(props) {
    return (
        <div style={{ opacity: props.opacity }}>
            <video loop autoPlay muted id="bg-video">
                <source src={require(`../assets/${props.fileName}`)} type="video/mp4" />
            </video>
        </div>
    )
}