import { createMuiTheme} from '@material-ui/core'

const backgroundPaperColor = '#243B4A'
const backgroundColor = '#2D4654'
const primaryColor = '#5C9EAD'
const secondaryColor = '#DE3C4B'

export default () => createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: primaryColor
        },
        secondary:{
            main: secondaryColor
        },
        background: {
            main: backgroundColor,
            paper: backgroundPaperColor
        }
    }
})