export default (theme) => ({
  navigationContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',

      [theme.breakpoints.only("xs")]: {
        flexDirection: 'column',
        alignItems: 'center',
      }
  },
  header: {
    marginBottom: '20px'
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
        fontSize: '32px',
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
            fontSize: '14px',
            textDecoration: 'none',
        }
    }
  },
});
