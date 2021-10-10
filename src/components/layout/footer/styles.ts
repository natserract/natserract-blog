import {
    Theme,
    createStyles
  } from "@material-ui/core/styles";

export default (theme: Theme) => createStyles({
    footer: {
        fontSize: '15px',
        lineHeight: '1.3em',
        textAlign: 'left',
        maxWidth: 800,
        // position: 'absolute',
        // width: '100%',
        // left: '50%',
        // bottom: '23px',
        // transform: 'translateX(-50%)',

        // [theme.breakpoints.only('xs')]: {
        //     width: '90%',
        // }
    }
})