import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { DiscussionEmbed } from 'disqus-react'
import { blogConfig } from '~/src/config';

import { useRouter } from 'next/router'
import React from 'react';

const isPostPage = (pathname: string) => pathname.includes('post')
const useStyles = makeStyles(styles);

const Content = ({ data }) => {
    const classes = useStyles()
    const router = useRouter()

    const RenderCoverImg = () => {
        return data?.coverImage ? <img className="post-cover-img" src={data?.coverImage} /> : null
    }

    const RenderTitle = () => {
        return data?.title ? <h1 className={classes.title}>{data?.title}</h1> : null
    }

    const RenderContent = () => (
        <article
            className={classes.content}
            dangerouslySetInnerHTML={{
                __html: data?.content || null
            }}
        />
    )

    const RenderDisqusEmbed = () => {
        // Disqus config
        const disqusConfig = {
            url: `${blogConfig.url}post/${data?.slug}`,
            identifier: `disqus-${data?.slug}`
        }

        if (isPostPage(router.pathname)) return (
            <div style={{ paddingTop: 25 }}>
                <DiscussionEmbed
                    shortname={blogConfig.shortName}
                    config={disqusConfig}
                />
            </div>
        )

        return <React.Fragment />
    }

    return (
        <React.Fragment>
            <RenderCoverImg />
            <RenderTitle />
            <RenderContent />
            <RenderDisqusEmbed />
        </React.Fragment>
    )
}

export default Content