import React from 'react';
import { getPostBySlug, getAllPosts } from '../../../lib';
import markdownToHtml from '../../../lib/markdownToHtml';
import { Box } from '@material-ui/core'

interface PostProps {
    post?: any
}

const Post: ComponentType<PostProps> = ({ post }: PostProps) => {
    if (!post) {
        return <Box>Post is undefined</Box>
    }

    return (
        <article dangerouslySetInnerHTML={{ __html: post?.content }}/>
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
