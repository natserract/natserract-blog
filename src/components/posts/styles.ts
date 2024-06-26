import { Theme, createStyles } from "@material-ui/core/styles";

export default (theme: Theme) =>
  createStyles({
    posts: {
      // display: "block",
      marginBottom: "5px",
      listStyle: "circle",

      "& .cursor-loading": {
        cursor: "progress",
      },
    },
    postsHeadContainer: {
      margin: 0,
      fontSize: "17px",
      display: "flex",
      flexDirection: "row",

      [theme.breakpoints.only("xs")]: {
        flexDirection: "column",
      },

      "& time": {
        [theme.breakpoints.only("xs")]: {
          float: "none",
          display: "block",
        },
      },

      "& a": {
        display: "inline",
        marginBottom: "3px",
        position: "relative",
        textDecoration: "underline",
      },

      "& span": {
        fontSize: 13,
      },
    },
    divider: {
      marginLeft: 3,
      marginRight: 3,
    },
    postDate: {
      fontSize: 13,
      fontWeight: 400,
      fontStyle: "italic",

      [theme.breakpoints.only("xs")]: {
        margin: "0",
      },
    },
    postListsContainer: {
      margin: "10px 0",
    },
    favoriteIcon: {
      paddingLeft: 5,
    },
    metaInfo: {
      display: "flex",
      alignItems: "center",

      [theme.breakpoints.only("xs")]: {
        "& > .hidden-xs": {
          display: "none",
        },
      },
    },
  });
