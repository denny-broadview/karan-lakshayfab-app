import React from 'react'
import {
    ActivityIndicator,
} from 'react-native'

import styles from './Styles/LoadingSpinnerStyles'

function LoadingView(props) {
    return (
        <ActivityIndicator
            { ...props }
            style={[props.doNotFill ? null : styles.parentView, props.style]}
        />
    )
}

export default LoadingView
