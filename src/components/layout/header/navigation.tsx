
import React, { useState } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { generateKey } from '~/src/utils'
import { useLoadingIndicator } from '~/src/hooks'

const useStyles = makeStyles(styles);

const NavigationMenuLists = ({ items }) => {
    const classes = useStyles()

    const [loadingState, setLoadingState] = useState(false)
    const loadingIndicator = useLoadingIndicator(loadingState, setLoadingState)

    return (
        <ul className={classes.menuLists}>
            {items && items.map((menu) => (
                <li key={generateKey()}>
                    <Link href={menu.path}>
                        <a onClick={loadingIndicator}>{menu.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NavigationMenuLists