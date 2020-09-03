import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';
import { Editor, Frame, Element } from "@craftjs/core";
import { Container } from '../components/user/Container';
import { Button } from '../components/user/Button';
import { Card, CardTop, CardBottom } from '../components/user/Card';
import { Text } from '../components/user/Text';
import { Video } from '../components/user/Video';
import { FreeDrag } from '../components/design/FreeDrag';
// import Backdrop from '../components/styled/StyledBackdrop';
import Background from '../assets/gray-texture2.png';
import lz from "lzutf8";
// import './components/filters/FilmGrain.css';

export default function PageView() {
    const [json, setJson] = useState(null);

    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/pages/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(res => res["identifier"])
            .then(result => lz.decompress(lz.decodeBase64(result)))
            .then(result => setJson(result))
    }, []);

    return (
        <Editor enabled={false} resolver={{ Card, Button, Text, Container, CardTop, CardBottom, Video, FreeDrag }}>
            {(json !== null) ? (
                <Frame json={json} />
            ) : null}
        </Editor>
    )
};