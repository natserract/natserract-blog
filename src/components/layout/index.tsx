import { makeStyles } from '@material-ui/core/styles'
import Header from './header'
import Footer from './footer'
import styles from './styles'
import jsonData from './layout.json'
import moment from 'moment'
interface PropsI {
    children: React.ReactNode
}

const config = {
    year: moment().year(),
    author: 'Alfin Surya',
}

const useStyles = makeStyles(styles);
const footerContent = `${config.year} ${config.author}. Kecuali dinyatakan lain, posting ini tersedia di bawah Lisensi Atribusi Creative Commons.`

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

            <Footer content={footerContent}/>
        </main>
    )
}

export default Layout
