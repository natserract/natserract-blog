import { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from './header'
import Footer from './footer'
import styles from './styles'
import jsonData from './layout.json'
import hljs from 'highlight.js';
import ReactDOM from 'react-dom'
import getYear from 'date-fns/get_year'
import { NextSeo } from 'next-seo'

const config = {
    year: getYear(new Date()),
    author: 'Alfin Surya',
}

const useStyles = makeStyles(styles);
const footerContent =
    `${config.year} ${config.author}. Kecuali dinyatakan lain, posting ini tersedia di bawah Lisensi saya sendiri.`

const Layout = (props) => {
    const classes = useStyles()
    const ref = useRef(null)

    const { title, titletemplate, description } = props

    const openGraphConfig = {
        type: 'website',
        images: [
            {
                url: props.image,
                width: 800,
                height: 600,
                alt: title,
            }
        ]
    }


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const accessNode = ReactDOM.findDOMNode(ref.current)

            if (accessNode) accessNode.querySelectorAll('pre code').forEach((block: any) => {
                hljs.highlightBlock(block);
            })
        }
    }, [])

    return (
        <>
            <NextSeo
                title={title}
                titleTemplate={titletemplate}
                description={description}
                openGraph={{...openGraphConfig}}
                additionalMetaTags={[{
                    name: 'google-site-verification',
                    content: 'Aj7wr9MHy1gfEFpCvEUBPWjP0q1nqbYFx8Zv4foEE0E'
                }]}
            />
            <main className={classes.mainLayout} ref={ref} {...props}>
                <Header
                    title="Natserract"
                    menuItems={jsonData?.menuItems}
                />

                <div className={classes.contentContainer}>
                    {props.children}
                </div>

                <Footer content={footerContent} />
            </main>
        </>
    )
}

export default Layout
