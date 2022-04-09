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
            <div className={classes.brandSection}>
                <a href="/" className={classes.brandLink}>
                    <Typography
                        variant="h1"
                        color='primary'
                        children={title}
                    />
                    <Typography variant="h2" className={classes.subTitle}>
                        Software Engineer
                    </Typography>
                </a>
            </div>

            <nav className={classes.navigation}>
                <div className={classes.navigationContainer}>
                    <NavigationMenu items={menuItems} />
                    <SocialMedia items={socialMediaItems} />
                </div>
            </nav>
            
        </header>
    )
}

export default Header
