import React from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './Styles/ClearFiltersStyles'


function ClearFilters(props) {

    const {
        style,
        press,
        textStyle,
        t1,
        t2,
        clearPress
    } = props

    return (<TouchableOpacity style={{marginBottom: 10, marginHorizontal: 15, flexDirection: 'row'}}
                              onPress={() => clearPress()}>
        <Text style={styles.clearFilterText}>{'Clear Filters X'}</Text>
    </TouchableOpacity>)

}

export default (ClearFilters)
