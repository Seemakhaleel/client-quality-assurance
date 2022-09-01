import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const theme = createTheme({
    palette: {
        primary: {
            light: '#8B8982',
            main: '#2C4251',
            dark: '#585555'
        },
        secondary: {
            light: red[300],
            main: '#b71c1c',
            dark: red[700]
        }
    },
    shape: {
        borderRadius: 6
    }
})
