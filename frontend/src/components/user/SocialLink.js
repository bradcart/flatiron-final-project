import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import { SocialLink as Link, SocialProvider } from '@mui-treasury/components/socialLink';
import { useBallSocialLinkStyles } from '@mui-treasury/styles/socialLink/ball';
import { FormControl, FormControlLabel, Typography, RadioGroup, Radio, TextField, Button as MaterialButton } from '@material-ui/core';

export const SocialLink = ({ brand, link }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <div ref={ref => connect(drag(ref))} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e3e3e3' }}>
            <SocialProvider useStyles={useBallSocialLinkStyles} style={{ margin: '0 auto' }}>
                <Link
                    brand={brand}
                    href={link}
                />
            </SocialProvider>
        </div>
    )
}

const SocialLinkSettings = () => {
    const { actions: { setProp }, brand, link } = useNode((node) => ({
        brand: node.data.props.brand,
        link: node.data.props.link
    }));

    const [linkTo, setLinkTo] = useState('')
    const changeLinkTo = (e) => {
        e.preventDefault();
        setProp(props => props.link = linkTo)
    }

    return (
        <div>
            <FormControl component="fieldset">
                <Typography id="settings-label" variant="body2" gutterBottom>VARIANT</Typography>
                <RadioGroup value={brand} onChange={(e) => setProp(props => props.brand = e.target.value)}>
                    <FormControlLabel label={<Typography variant="body2">Facebook</Typography>} value="Facebook" control={<Radio size="small" color="secondary" />} />
                    <FormControlLabel label={<Typography variant="body2">Instagram</Typography>} value="Instagram" control={<Radio size="small" color="secondary" />} />
                    <FormControlLabel label={<Typography variant="body2">Twitter</Typography>} value="Twitter" control={<Radio size="small" color="secondary" />} />
                    <FormControlLabel label={<Typography variant="body2">Email</Typography>} value="Envelope" control={<Radio size="small" color="secondary" />} />
                </RadioGroup>
            </FormControl>
            <form onSubmit={(e) => changeLinkTo(e)} noValidate>
                <Typography id="settings-label" variant="body2" style={{ marginTop: '14px' }}>
                    LINK
                </Typography>
                <TextField
                    // inputProps={{
                    //     className: classes.input
                    // }}
                    variant="outlined"
                    margin="dense"
                    size="small"
                    id="hRef"
                    name="HREF"
                    onChange={e => setLinkTo(e.target.value)}
                />
                <MaterialButton
                    type="submit"
                    size="medium"
                    variant="outlined"
                    color="primary"
                    style={{ marginTop: '5px' }}
                // className={classes.submit}
                >
                    ADD
                </MaterialButton>
            </form>
        </div>
    )
}

SocialLink.craft = {
    displayName: "Social",
    props: {
        brand: "Facebook"
    },
    related: {
        settings: SocialLinkSettings
    }
}