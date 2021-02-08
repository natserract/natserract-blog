import { useCallback, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { PropsI } from './types'
import { generateKey } from '../../utils'
import Link from 'next/link'
import moment from 'moment'

const useStyles = makeStyles(styles);

const parseDate = (date: string) => moment(date).format('MMMM YYYY')
const Posts: ComponentType<PropsI> = ({ data }: PropsI) => {
    const classes = useStyles()
    const [state, setState] = useState(false)

    const handlingClick = useCallback(() => {
        setState(true)
    }, [])

    useEffect(() => {
        if (state) document.body.classList.add('loading-indicator')
        return () =>  document.body.classList.remove('loading-indicator')
    }, [state])

    if (!data) {
        return <>Data must be set!</>
    }

    return (
        <ul className={classes.postListsContainer}>
            { data && data.map((item) => {
                const { title, excerpt, date, slug } = item;

                return (
                    <li key={generateKey()} className={classes.posts}>
                        <div className={classes.postsHeadContainer}>
                            <Link href={`post/${slug}`}>
                                <a onClick={handlingClick}>{title}</a>
                            </Link>
                            <span className={classes.postDate}>{parseDate(date)}</span>
                        </div>
                        <span>{excerpt}</span>
                    </li>
                )
            })}
        </ul>
    )
}

export default Posts
