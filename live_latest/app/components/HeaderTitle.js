import React from 'react'
import {
    Text, TextInput,
} from 'react-native';

import styles from './Styles/HeaderTitleStyles'

function HeaderTitle(props) {
    return (
        <Text   allowFontScaling={false} style={[styles.title, props.style]}>{props.title}</Text>
    )
}

export default HeaderTitle
