import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

interface PropsI {
    data: {
        title: string;
        content: string;
        coverImage: string;
    }
}

const useStyles = makeStyles(styles);

const Content: ComponentType<PropsI> = ({ data }: PropsI) => {
    const classes = useStyles()

    const RenderCoverImg = () => {
        return data?.coverImage ? <img className="post-cover-img" src={data?.coverImage} /> : null
    }

    const RenderTitle = () => {
        return data?.title ? <h1 className={classes.title}>{data?.title}</h1> : null
    }


    return (
        <>
            <RenderCoverImg />
            <RenderTitle />
            <article className={classes.content} 
                dangerouslySetInnerHTML={{ __html: data?.content || null }} 
            />
        </>
    )
}

export default Content