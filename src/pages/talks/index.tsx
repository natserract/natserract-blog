import React from 'react';
import { getPostBySlug } from '../../../lib';
import markdownToHtml from '../../../lib/markdownToHtml';
import Box from '@material-ui/core/Box'
import Layout from '~/src/components/layout'
import Content from '~/src/components/content'

// Path for markdown file
const pathDirectory = '../src/pages/talks/_talks'

const About = ({ post }) => {
    if (!post) {
        return <Box>Post is undefined</Box>
    }

    return (
        <Layout>
            <Content data={post} />
        </Layout>
    )
}

export async function getStaticProps() {
    const post: PostI = getPostBySlug(pathDirectory, [
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

export default About;
