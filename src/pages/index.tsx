import React from 'react'
import { getAllPosts } from '../../lib';
import { blogConfig as config } from '../config/blog.config';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout'
import Posts from '../components/posts'
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
      <Posts data={allPosts} />
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