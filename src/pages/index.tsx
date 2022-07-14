import React from "react";
import { getAllPosts } from "../../lib";
import { blogConfig as config } from "../config/blog.config";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/layout";
import Posts from "../components/posts";
import Typography from "@material-ui/core/Typography";

import styles from "./styles";

const useStyles = makeStyles(styles);
const seoDesc =
  "Natserract. Alfin Surya Personal Blog, Make More Better. #natserract #alfinsurya";

const Home = ({ allPosts }) => {
  const classes = useStyles();

  if (!allPosts && allPosts.length < 1) {
    return <>Data is not ready (is undefined?)</>;
  }

  return (
    <Layout>
      <div className={classes.introSection}>
        <p>
          Hey, I'm <b>Alfin</b>. I’m a software engineer interested in how we
          can make it easier to build software that is good for users. Lately,
          I've been involves in type systems, functional programming: (
          <a href="https://elixir-lang.org/">
            <b>elixir</b>
          </a>
          , <a href="https://www.haskell.org/">haskell</a>), and islamic books.
          Currently open to collaboration, discussion and remote work.
        </p>
        <p>
          This blog is a collection of links about programming that I find
          interesting. By sharing it with you, I hope to attract other people
          with similar tastes who will share the new link with me, at the same
          time hope it will be of use.
        </p>
      </div>
      <div className={classes.blogSection}>
        <Typography variant="h3" component="h2">
          Bλog Posts
          <span className={classes.toc}>(favorites have sparkles)</span>
        </Typography>
        <Posts data={allPosts} />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "coverImageAlt",
    "excerpt",
    "draft",
    "favorite",
    "content",
  ]);

  const startIndex = 0;
  const endIndex = config.postsPerPage;
  const prevPosts = null;
  const nextPosts = endIndex >= posts.length ? null : 2;

  return {
    props: {
      allPosts: posts.slice(startIndex, endIndex),
      prevPosts,
      nextPosts,
    },
  };
}

export default Home;
