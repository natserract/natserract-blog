export default (theme) => ({
  posts: {
    display: "block",
    marginBottom: "15px",
  },
  postsHeadContainer: {
    display: 'flex',
    alignItems: 'flexStart',

    "& a": {
      display: "block",
      marginBottom: "3px",
      fontSize: "16px",
    },
  },
  postDate: {
    fontSize: '13px',
    opacity: '.5',
    marginLeft: '8px',
  }
});
