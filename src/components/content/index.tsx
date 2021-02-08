import { makeStyles } from '@material-ui/core/styles'

interface PropsI {
    data: {
        title: string;
        content: string;
        coverImage: string;
    }
}

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: '30px'
    },
    content: {
        "& blockquote": {
            borderLeft: 'solid 4px #d2d6db',
            padding: '0 0 0 20px',
            margin: '0 0 15px',
        },
        "& code:not(.hljs)": {
            padding: '.2em .4em',
            margin: '0',
            fontSize: '85%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '3px',
        }
    }
}));

const Content: ComponentType<PropsI> = ({ data }: PropsI) => {
    const classes = useStyles()

    const RenderCoverImg = () => {
        return data?.coverImage  ?<img className="post-cover-img" src={data?.coverImage} /> : null
   }

    return (
        <>
            <RenderCoverImg />
            <h1 className={classes.title}>{data?.title}</h1>
            <article className={classes.content} 
                dangerouslySetInnerHTML={{ __html: data?.content || null }} 
            />
        </>
    )
}

export default Content