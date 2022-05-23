import React from 'react';
import {
    TouchableOpacity,
    Text, FlatList, View,
} from 'react-native';

import {Colors} from '@resources';

import styles from './Styles/AdminOrderStyles';
import {Strings} from '../utils/Strings';
import Button from './Button';

function renderItem(item, index) {

    return <View style={styles.itemParentView}>
        <View style={styles.itemView}>
            <Text style={styles.orderTextStyle}> {'Firm Name'}</Text>

            <Text style={styles.shippingStatusTextStyle}> {'Status'}</Text>
        </View>
        <View style={styles.itemView}>
            <Text style={styles.orderTextStyle}> {'Order No GC 02034'}</Text>
            <Text style={styles.amountTextStyle}> {'Rs. 2160'}</Text>
        </View>
        <View style={styles.itemView}>
            <Text style={styles.orderTextStyle}> {Strings.home.delivery_date}</Text>
            <Text style={styles.shippingDateTextStyle}> {'04/12/2020'}</Text>
        </View>


    </View>;
}

function AdminOrder(props) {

    return (
        <FlatList
            {...props}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(item, index) => item.id || index.toString()}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
        />
    );
}

export default AdminOrder;

