import React from 'react'
import { getAllPosts } from '../../lib';
import { blogConfig as config } from '../config/blog.config';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

const useStyles = makeStyles(styles);

interface HomePropsI {
    allPosts?: any
}

const Home: ComponentType<HomePropsI> = ({ 
  allPosts 
}: HomePropsI) => {
    const classes = useStyles();  

    return (
        <div>
            <h2 className={classes.title}>Article</h2>
            { JSON.stringify(allPosts) }
        </div>
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
        "draft"
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