import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

interface PropsI {
    content: string
}

const useStyles = makeStyles(styles);

const Footer: ComponentType<PropsI> = ({ content }: PropsI) => {
    const classes = useStyles()

    return  (
        <footer className={classes.footer}>
            <span>{content}</span>
        </footer>
    )
}

export default Footer
