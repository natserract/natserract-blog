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
            <a className={classes.license} rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
                <img src="https://licensebuttons.net/l/by-sa/3.0/88x31.png" alt="Creative Commons License"/>
            </a>
        </footer>
    )
}

export default Footer
