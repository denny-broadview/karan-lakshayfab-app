import React from 'react'
import {
    ActivityIndicator,
    View,Text
} from 'react-native'

import styles from './Styles/LoadingSpinnerStyles'

function LoadingSpinner(props) {
    return (<View style={styles.loadingView}>

            <View style={styles.loadingChildView}>
                <ActivityIndicator size='large' color='grey'/>
                <Text style={{fontSize: 16, color: 'grey', fontWeight: 'bold'}}>
                    {'Please wait... ' + ' '}
                </Text>
            </View>
        </View>
    )
}

export default LoadingSpinner
