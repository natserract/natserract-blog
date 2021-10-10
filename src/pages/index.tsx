import React from 'react'
import { getAllPosts } from '../../lib';
import { blogConfig as config } from '../config/blog.config';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout'
import Posts from '../components/posts'
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const useStyles = makeStyles(styles);
const seoDesc = "Natserract. Alfin Surya Personal Blog, Make More Better. #natserract #alfinsurya"

const Home = ({ allPosts }) => {
  const classes = useStyles();

  if (!allPosts && allPosts.length < 1) {
    return <>Data is not ready (is undefined?)</>
  }

  return (
    <Layout>
      <div className={classes.introSection}>
        <p>Hey, I'm <b>Alfin Surya</b> aka <i>Natserract</i>. I'm a software engineer and writer. I love build things that make useful for another people's. Lately, I've been interested in tooling, functional programming, and islamic books. Currently open to collaboration, discussion and remote work.</p>
        <p>This blog is a collection of links about programming that I find interesting. By sharing it with you, I hope to attract other people with similar tastes who will share the new link with me, at the same time hope it will be of use.</p>
      </div>
      <div className={classes.blogSection}>
        <Typography variant="h3" component="h2">
          Blog Posts
        </Typography>
        <Posts data={allPosts} />
      </div>
    </Layout>
  )
}

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
  ]);

  const startIndex = 0
  const endIndex = config.postsPerPage
  const prevPosts = null
  const nextPosts = endIndex >= posts.length ? null : 2

  return {
    props: {
      allPosts: posts.slice(startIndex, endIndex), prevPosts, nextPosts
    },
  }
}

export default Home;