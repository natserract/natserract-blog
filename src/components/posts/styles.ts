import {
  Theme,
  createStyles
} from "@material-ui/core/styles";

export default (theme: Theme) => createStyles({
  posts: {
    display: "block",
    marginBottom: "20px",

    [theme.breakpoints.only("xs")]: {
      marginBottom: "33px",
    },

    "& .cursor-loading": {
      cursor: "progress",
    },
  },
  postsHeadContainer: {
    margin: '0 0 10px',
    borderBottom: 'dashed 1px #595959',

    "& time": {
      float: 'right',
      marginTop: 6,

      [theme.breakpoints.only("xs")]: {
        float: 'none',
        display: 'block',
        margin: '0 0 6px',
      }
    },

    "& a": {
      display: "inline",
      marginBottom: "3px",
      fontSize: "20px",
      position: 'relative',
    },
  },
  postDate: {
    fontSize: "16px",
    marginLeft: "8px",
    fontWeight: 400,
    fontStyle: 'italic',

    [theme.breakpoints.only("xs")]: {
      margin: "0",
    },
  },
  postListsContainer: {
    paddingLeft: "0",
  },
  favoriteIcon: {
    paddingLeft: 5,
  }
});
