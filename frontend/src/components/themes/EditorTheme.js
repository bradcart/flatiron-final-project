import { createMuiTheme } from "@material-ui/core/styles";

const EditorTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#181818',
            contrastText: '#F0F5F3'
        },
        secondary: {
            main: '#f50057',
        },
        focused: {
            color: '#f50057'
        }
    }
})

export default EditorTheme;

