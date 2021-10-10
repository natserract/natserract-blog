import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from './header'
import Footer from './footer'
import styles from './styles'
import jsonData from './layout.json'
import hljs from 'highlight.js';
import ReactDOM from 'react-dom'
import getYear from 'date-fns/get_year'
import ScrollToTop from './scrollToTop'

const config = {
    year: getYear(new Date()),
    author: 'Alfin Surya',
}

const useStyles = makeStyles(styles);
const footerContent =
    `© ${config.year} ${config.author}. Posting ini tersedia di bawah Lisensi saya sendiri.`

const Layout: React.FC = (props) => {
    const classes = useStyles()
    const ref = useRef(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const accessNode = ReactDOM.findDOMNode(ref.current)

            if (accessNode) {
                accessNode.querySelectorAll('pre code').forEach((block: HTMLElement) => hljs.highlightBlock(block))
            }
        }
    }, [])

    return (
        <React.Fragment>
            <main className={classes.mainLayout} ref={ref} {...props}>
                <Header title="Natserract" menuItems={jsonData?.menuItems} />

                <div className={classes.contentContainer}>
                    {props.children}
                </div>

                <Footer content={footerContent} />
            </main>

            <ScrollToTop />
        </React.Fragment>
    )
}

export default Layout
