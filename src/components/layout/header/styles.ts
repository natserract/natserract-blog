import {
  Theme,
  createStyles
} from "@material-ui/core/styles";

export default (theme: Theme) => createStyles({
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',

    [theme.breakpoints.only("xs")]: {
      flexDirection: 'column',
      alignItems: 'center',
    }
  },
  header: {
    marginBottom: '14px'
  },
  socialMedia: {
    display: 'flex',
    alignItems: 'center',
    listStyle: 'none',
    padding: '0',
    margin: '0',

    [theme.breakpoints.only("xs")]: {
      margin: '10px 0 0',
    },

    "& li": {
      paddingRight: '15px',

      "& a": {
        textDecoration: 'none',
      }
    }
  },
  brandLink: {
    display: "inline-block",
    fontSize: "35px",
    textDecoration: "none",
    fontWeight: "bolder",
    fontStyle: "italic",

    [theme.breakpoints.only("xs")]: {
      display: "block",
      textAlign: "center",
    },

    "& h1": {
      textTransform: "uppercase",
      fontSize: "42px",
      fontWeight: "bold",
      fontFamily: "'PT Serif', serif",
      letterSpacing: "1px",

      [theme.breakpoints.only("xs")]: {
        display: "block",
        textAlign: "center",
        fontSize: '40px',
      },
    },
  },
  subTitle: {
    display: "block",
    fontSize: "17px",
    fontWeight: "lighter",
    opacity: "0.7",
    margin: '5px 0 0'

  },
  navigation: {
    paddingBottom: "15px",
    borderBottom: "1px solid #dcf1d5",
  },
  menuLists: {
    display: "flex",
    justifyContent: "space-between",
    listStyle: 'none',
    padding: '0',
    margin: '0',

    "& li": {
      [theme.breakpoints.up('sm')]: {
        paddingRight: '20px',
      },

      [theme.breakpoints.only('xs')]: {
        padding: '0 10px'
      },

      "& > a": {
        fontSize: '16px',
        textDecoration: 'none',
      }
    }
  },
});
