import React from 'react';
import Switch from '@material-ui/core/Switch';
import { useN02SwitchStyles } from '@mui-treasury/styles/switch/n02';

const StyledSwitch = () => {
    const [toggled, setToggled] = React.useState(false);
    const switchStyles = useN02SwitchStyles();
    return (
        <div>
            <Switch
                color="primary"
                classes={switchStyles}
                checked={toggled}
                onChange={e => setToggled(e.target.checked)}
            />
            <Switch
                color="secondary"
                classes={switchStyles}
                checked={!toggled}
                onChange={e => setToggled(!e.target.checked)}
            />
        </div>
    );
};

export default StyledSwitch;