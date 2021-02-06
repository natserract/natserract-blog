import Icon from '~/src/components/icon'
import { makeStyles } from '@material-ui/core/styles'
import { generateKey } from '../../../utils'
import styles from './styles'

const useStyles = makeStyles(styles);
const SocialMediaLists = ({ items }) => {
    const classes = useStyles()

    return (
        <ul className={classes.socialMedia}>
            { items && items.map((item) => (
                <li key={generateKey()}>
                    <a href={item.href} target="blank">
                        <i className={`icon-${item.iconName}`}></i>
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default SocialMediaLists