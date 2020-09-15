// Import the component...
import React from 'react';
import { useNode } from '@craftjs/core';
import { Gradient, GradientProvider } from 'uigradients';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Now, use it!

const GradientDiv = ({ preset }) => {
    return (
        <Gradient preset={preset} style={{width: '100%', height: '100%'}} >
            <h1>This will draw a div with a cherry gradient, like the one you're looking at right now.</h1>
        </Gradient>
    );
}

const GradientSettings = () => {
    const { preset, actions: { setProp } } = useNode(node => ({
        preset: node.data.props.preset
    }))

    // const [gradient, setGradient] = useState("azure_pop")
    const handleChange = () => {
        setProp(props => props.preset = e.target.value)
    }

    return (
        <FormControl margin="normal" component="fieldset" style={{ margin: 'auto' }}>
            <Typography id="settings-label" variant="body2" gutterBottom>
                GRADIENT
            </Typography>
            <Select
                id="gradient-select"
                value={gradient}
                onChange={handleChange}
            >
                <MenuItem value={"a_lost_memory"}>A Lost Memory</MenuItem>
                <MenuItem value={"azure_pop"}>Azure Pop</MenuItem>
                <MenuItem value={"eds_sunset_gradient"}>Sunset</MenuItem>
            </Select>
        </FormControl>
    )
}

const GradientDefaultProps = {
    preset: "azure_pop"
};

Gradient.craft = {
    displayName: "Gradient",
    props: GradientDefaultProps,
    related: {
        settings: GradientSettings
    }
}

export default GradientDiv