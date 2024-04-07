export default (theme) => ({
  title: {
    lineHeight: "1.2",
    fontSize: "30px",
    fontWeight: 700,
    fontFamily: '"Roboto", sans-serif',
    margin: "0 0 5px",

    [theme.breakpoints.only("xs")]: {},
  },
  content: {
    fontSize: "18px",

    "& h2, h3, h4, h5, h6": {
      marginTop: 30,
    },
    "& h2": {
      position: "relative",
      display: "inline-block",
      fontWeight: "bolder",

      "&:after": {
        content: `'¶'`,
        position: "absolute",
        fontFamily: '"Abhaya Libre", serif',
        right: -33,
        width: 15,
        height: 30,
        top: "-4px",
        bottom: 0,
        color: "#DDD",
        fontSize: 35,
      },
    },
    "& blockquote": {
      borderLeft: "solid 4px #d2d6db",
      background: "#f9f9f9",
      padding: "15px 15px 15px 25px",
      margin: "15px 0 30px",
    },
    "& blockquote p": {
      margin: "0",
    },
    "& code:not(.hljs)": {
      padding: ".2em .4em",
      margin: "0",
      fontSize: "85%",
      backgroundColor: "rgb(240, 239, 239)",
      borderRadius: "3px",
    },
    "& .img-float": {
      [theme.breakpoints.up("sm")]: {
        float: "right",
        width: "120px",
        height: "145px",
        marginLeft: "15px",
      },
    },
    "& small": {
      fontSize: "16px",
      display: "block",
      opacity: "0.5",
    },
    "& ol": {
      padding: "0 0 10px 30px",

      "& li": {
        marginBottom: 7,
      },
    },
    "& ul": {
      padding: "0 0 10px 30px",

      "& li": {
        marginBottom: 7,
      },
    },
    "& .section-group-about": {
      margin: "0 0 35px",

      "&.noMargin": {
        margin: 0,
      },
      "& ul": {
        padding: "0",
        listStyleType: "none",
      },

      "& strong": {
        fontWeight: "bold",
      },
    },
    "& .container-sm": {
      maxWidth: "500px",
    },
    "& sub": {
      lineHeight: ".2em",
    },
  },
  postCoverImg: {
    margin: "17px 0 30px",
    maxHeight: "500px",
    objectFit: "cover",
  },
  titleContainer: {
    margin: "20px 0 25px",
  },
  published: {
    fontStyle: "italic",
    fontSize: 16,
  },
});
