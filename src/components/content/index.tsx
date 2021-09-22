import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { DiscussionEmbed } from 'disqus-react'
import { blogConfig } from '~/src/config';

const useStyles = makeStyles(styles);

const Content = ({ data }) => {
    const classes = useStyles()

    const RenderCoverImg = () => {
        return data?.coverImage ? <img className="post-cover-img" src={data?.coverImage} /> : null
    }

    const RenderTitle = () => {
        return data?.title ? <h1 className={classes.title}>{data?.title}</h1> : null
    }

    // Disqus config
    const disqusConfig = {
        url: `${blogConfig.url}post/${data?.slug}`,
        identifier: `disqus-${data?.slug}`
    }

    return (
        <>
            <RenderCoverImg />
            <RenderTitle />
            <article
                className={classes.content}
                dangerouslySetInnerHTML={{
                    __html: data?.content || null
                }}
            />

            <DiscussionEmbed
                shortname={blogConfig.shortName}
                config={disqusConfig}
            />
        </>
    )
}

export default Content