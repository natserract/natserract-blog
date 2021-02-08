export default (theme) => ({
  mainLayout: {
    background: "rgb(255, 255, 255) none repeat scroll 0% 0%",
    maxWidth: "800px",
    overflow: "hidden",
    margin: "0 auto",
    padding: "25px 35px",
    minHeight: "100vh",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "92%",
    },

    [theme.breakpoints.only("xs")]: {
      padding: "15px",
    },
  },

  contentContainer: {
    paddingBottom: "40px",

    "& img": {
      display: "block",
      width: "100%",
      height: "auto",
    },
    
    '& .post-cover-img': {
        marginBottom: '33px',
    }
  },
});
