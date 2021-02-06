import React from 'react'
import PropTypes from 'prop-types'
import MuiIcon from '@material-ui/core/Icon'

const Icon = ({
    name,
    classesIcon,
}) => {

    return (
        <MuiIcon className={classesIcon}>
            {name}
        </MuiIcon>
    )
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    classesIcon: PropTypes.string,
}

export default Icon
