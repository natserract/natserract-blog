
import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { generateKey } from '~/src/utils'

const useStyles = makeStyles(styles);

const NavigationMenuLists = ({ items }) => {
    const classes = useStyles()

    return (
        <ul className={classes.menuLists}>
            {items && items.map((menu) => (
                <li key={generateKey()}>
                    <Link href={menu.path}>
                        <a>{menu.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NavigationMenuLists