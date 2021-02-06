import { makeStyles } from '@material-ui/core/styles'
import Header from './header'
import styles from './styles'
import jsonData from './layout.json'

interface PropsI {
    children: React.ReactNode
}

const useStyles = makeStyles(styles);

const Layout: ComponentType<PropsI> = ({ children }: PropsI) => {
    const classes = useStyles()

    return (
        <main className={classes.mainLayout}>
            <Header
                title="Natserract"
                menuItems={jsonData?.menuItems}
            />

            <div className={classes.contentContainer}>
                {children}
            </div>
        </main>
    )
}

export default Layout
