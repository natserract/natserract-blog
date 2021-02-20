export default (theme) => ({
  posts: {
    display: "block",
    marginBottom: "15px",

    [theme.breakpoints.only("xs")]: {
      marginBottom: "20px",
    },

    "& .cursor-loading": {
      cursor: "progress",
    },
  },
  postsHeadContainer: {
    display: "flex",
    alignItems: "flex-start",

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column-reverse",
    },

    "& a": {
      display: "block",
      marginBottom: "3px",
      fontSize: "16px",
    },
  },
  postDate: {
    fontSize: "13px",
    opacity: ".5",
    marginLeft: "8px",

    [theme.breakpoints.only("xs")]: {
      margin: "0",
    },
  },
  postListsContainer: {
    paddingLeft: "0",
  },
});
