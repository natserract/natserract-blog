import React from 'react';
import { getPostBySlug, getAllPosts } from '../../../lib';
import markdownToHtml from '../../../lib/markdownToHtml';
import Box from '@material-ui/core/Box'
import Layout from '~/src/components/layout'
import Content from '~/src/components/content'

interface PostProps {
    post?: any
}

// Path for markdown file
const pathDirectory = '../src/pages/projects/_projects'

const Projects: ComponentType<PostProps> = ({ post }: PostProps) => {
    if (!post) {
        return <Box>Projects is undefined</Box>
    }

    return (
        <Layout>
            <Content data={post} />
        </Layout>
    )
}

export async function getStaticProps() {
    const post: any = getPostBySlug(pathDirectory, [
        "title",
        "excerpt",
        "date",
        "slug",
        "author",
        "content",
        "coverImage",
        "coverImageAlt",
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

export default Projects;
