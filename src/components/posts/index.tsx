import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { PropsI } from './types'
import { generateKey } from '../../utils'
import Link from 'next/link'
import { useLoadingIndicator } from '~/src/hooks'
import format from 'date-fns/format'

const useStyles = makeStyles(styles);
const parseDate = (date: number | Date) => format(date, 'MMMM YYYY')

const Posts: ComponentType<PropsI> = ({ data }: PropsI) => {
    const classes = useStyles()

    const [loadingState, setLoadingState] = useState(false)
    const loadingIndicator = useLoadingIndicator(loadingState, setLoadingState)

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
                                <a onClick={loadingIndicator}>{title}</a>
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
