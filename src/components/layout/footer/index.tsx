import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

interface PropsI {

}

const useStyles = makeStyles(styles);

const Footer: ComponentType<{PropsI}> = ({

}: PropsI) => {
    const classes = useStyles()

    return  (
        <div>
            Footer
        </div>
    )
}

export default Footer
