import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import Typography from '@material-ui/core/Typography';
import NavigationMenu from './navigation'
import SocialMedia from './social-media'
import { socialMediaItems } from './data.json'

interface PropsI {
    title: string;
    menuItems: Array<any>;
}

const useStyles = makeStyles(styles);

const Header: ComponentType<PropsI> = ({ title, menuItems }: PropsI) => {
    const classes = useStyles()

    return (
        <header className={classes.header}>
            <nav className={classes.navigation}>
                <a href="/" className={classes.brandLink}>
                    <Typography
                        variant="h1"
                        color='primary'
                        children={title}
                    />
                    <span className={classes.subTitle}>Jarrib walaahizh takun ‘arifan</span>
                </a>

                <div className={classes.navigationContainer}>
                    <NavigationMenu items={menuItems} />
                    <SocialMedia items={socialMediaItems} />
                </div>
            </nav>
        </header>
    )
}

export default Header
