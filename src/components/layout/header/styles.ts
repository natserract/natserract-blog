import { Theme, createStyles } from "@material-ui/core/styles";

export default (theme: Theme) =>
  createStyles({
    navigationContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "7px",

      [theme.breakpoints.only("xs")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    header: {},
    socialMedia: {
      display: "flex",
      alignItems: "center",
      listStyle: "none",
      padding: "0",
      margin: "0",
      fontSize: 12,

      [theme.breakpoints.only("xs")]: {
        margin: "10px 0 0",
      },

      "& li": {
        paddingRight: "15px",

        "& a": {
          textDecoration: "none",
        },
      },
    },
    brandLink: {
      display: "inline-block",
      fontSize: "35px",
      textDecoration: "none !important",

      [theme.breakpoints.only("xs")]: {
        display: "block",
      },

      "& h1": {
        fontSize: "45px",
        fontWeight: 600,
        color: "#1d1d27",

        [theme.breakpoints.only("xs")]: {
          display: "block",
        },
      },
    },
    subTitle: {
      display: "block",
      fontSize: "27px",
      fontWeight: "lighter",
      color: "#1d1d27",
      fontStyle: "italic",
      marginTop: "-5px",
    },
    navigation: {},
    menuLists: {
      display: "flex",
      justifyContent: "space-between",
      listStyle: "none",
      padding: "0",
      margin: "0",

      "& li": {
        [theme.breakpoints.up("sm")]: {
          paddingRight: "20px",
        },

        [theme.breakpoints.only("xs")]: {
          padding: "0 10px",
          "&:nth-of-type(1)": {
            paddingLeft: 0,
          },
        },

        "& > a": {
          fontSize: 13,
          fontFamily: "sans-serif",
          textTransform: "uppercase",
        },
      },
    },
    brandSection: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "solid 2px #1d1d27",
      paddingBottom: "7px",

      [theme.breakpoints.only("xs")]: {
        alignItems: "flex-start",
        flexDirection: "column",
      },
    },
  });
