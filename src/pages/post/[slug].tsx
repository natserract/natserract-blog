import React from 'react';
import { getPostBySlug, getAllPosts } from '../../../lib';
import markdownToHtml from '../../../lib/markdownToHtml';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '~/src/components/layout'
interface PostProps {
    post?: any
}

const useStyles = makeStyles((theme) => ({
    postTitle: {
        marginBottom: '30px'
    }
}))

const Post: ComponentType<PostProps> = ({ post }: PostProps) => {
    const classes = useStyles()

    if (!post) {
        return <Box>Post is undefined</Box>
    }

    return (
        <Layout>
             <h1 className={classes.postTitle}>{post?.title}</h1> 
             <article dangerouslySetInnerHTML={{ __html: post?.content || null }} />
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const post: any = getPostBySlug(params.slug, [
        "title",
        "excerpt",
        "date",
        "slug",
        "author",
        "content",
        "coverImage",
        "coverImageAlt",
        "draft",
    ])

    const content = await markdownToHtml(post.content || '')

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(["slug"])
    return {
        paths: posts.map((post) => {
            return {
                params: { ...post },
            }
        }),
        fallback: false,
    }
}

export default Post;
