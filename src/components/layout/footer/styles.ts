import { Theme, createStyles } from "@material-ui/core/styles";

export default (theme: Theme) =>
  createStyles({
    footer: {
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
      fontFamily: "sans-serif",
      lineHeight: "1.3em",
      textAlign: "left",
      maxWidth: 800,
      justifyContent: "space-between",

      "& span": {
        paddingRight: 25,
      },
      // position: 'absolute',
      // width: '100%',
      // left: '50%',
      // bottom: '23px',
      // transform: 'translateX(-50%)',

      // [theme.breakpoints.only('xs')]: {
      //     width: '90%',
      // }
    },
    license: {
      [theme.breakpoints.only("xs")]: {
        "& img": {
          width: 75,
        },
      },
    },
  });
