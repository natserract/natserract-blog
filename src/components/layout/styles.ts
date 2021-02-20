import {
  Theme,
  createStyles
} from "@material-ui/core/styles";

export default (theme: Theme) => createStyles({
  mainLayout: {
    background: "rgb(255, 255, 255) none repeat scroll 0% 0%",
    maxWidth: "800px",
    overflow: "hidden",
    margin: "0 auto",
    padding: "25px 35px",
    minHeight: "100vh",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "95%",
    },

    [theme.breakpoints.only("xs")]: {
      padding: "15px",
    },
  },

  contentContainer: {
    paddingBottom: "5em",

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
