import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { DiscussionEmbed } from 'disqus-react'
import { blogConfig } from '~/src/config';
import Typography from '@material-ui/core/Typography';

import { useRouter } from 'next/router'
import React from 'react';
import format from 'date-fns/format'

const isPostPage = (pathname: string) => pathname.includes('post')
const parseDate = (date: number | Date) => format(date, 'MMMM DD, YYYY')
const useStyles = makeStyles(styles);

const Content = ({ data }) => {
    const classes = useStyles()
    const router = useRouter()

    const RenderCoverImg = () => {
        return data?.coverImage ? <img className={classes.postCoverImg} src={data?.coverImage} /> : null
    }

    const RenderTitle = () => {
        return data?.title ? (
            <div className={classes.titleContainer}>
                <Typography variant="h3" component="h1" className={classes.title}>{data?.title}</Typography>
                <span className={classes.published}>Published {parseDate(data?.date)}</span>
            </div>
        ) : null
    }

    const RenderContent = () => (
        <article
            className={classes.content}
            dangerouslySetInnerHTML={{
                __html: data?.content || null
            }}
        />
    )

    // const RenderDisqusEmbed = () => {
    //     // Disqus config
    //     const disqusConfig = {
    //         url: `${blogConfig.url}post/${data?.slug}`,
    //         identifier: `disqus-${data?.slug}`
    //     }

    //     if (isPostPage(router.pathname)) return (
    //         <div style={{ paddingTop: 25 }}>
    //             <DiscussionEmbed
    //                 shortname={blogConfig.shortName}
    //                 config={disqusConfig}
    //             />
    //         </div>
    //     )

    //     return <React.Fragment />
    // }

    return (
        <React.Fragment>
            <RenderCoverImg />
            <RenderTitle />
            <RenderContent />
            {/* <RenderDisqusEmbed /> */}
        </React.Fragment>
    )
}

export default Content