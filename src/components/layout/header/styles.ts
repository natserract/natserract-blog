export default (theme) => ({
  navigationContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
  },
  header: {
    marginBottom: '20px'
  },
  socialMedia: {
    display: 'flex',
    alignItems: 'center',

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
    fontWeight: "700",
    fontStyle: "italic",

    [theme.breakpoints.only("xs")]: {
      display: "block",
      textAlign: "center",
    },

    "& h1": {
      textTransform: "uppercase",
      fontSize: "35px",
      fontWeight: "bold",

      [theme.breakpoints.only("xs")]: {
        display: "block",
        textAlign: "center",
      },
    },
  },
  subTitle: {
    display: "block",
    fontSize: "14px",
    fontWeight: "300",
    opacity: "0.7",
  },
  navigation: {
    paddingBottom: "15px",
    borderBottom: "1px solid #dcf1d5",
  },
  menuLists: {
    display: "flex",
    justifyContent: "space-between",

    "& li": {
        [theme.breakpoints.up('sm')]: {
            paddingRight: '20px',
        },

        [theme.breakpoints.only('xs')]: {
            padding: '0 10px'
        },
        
        "& > a": {
            fontSize: '14px',
            textDecoration: 'none',
        }
    }
  },
});
