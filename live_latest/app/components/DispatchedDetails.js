import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './Styles/DispatchedDetailsStyles';
import {Strings} from '../utils/Strings';
import {formatOrderDate, formatString} from '../utils/TextUtils';
import {Constants} from '../Resources';
import LocationIcon from '@svg/icon_location';

import Dash from 'react-native-dash';
import Colors from '../Resources/Colors';

function renderOrderFirmTotal(title, message) {
    return <View style={styles.childItemsView}>
        <Text style={styles.titleView}>{title}</Text>
        <Text style={styles.valueView}>{message}</Text>

    </View>;
}

function DispatchedDetails(props) {

    const {orderItem} = props;
    const {transportation_name, LR_number, bill_number,notes,shipping_date,expected_delivery_date} = orderItem;

    return <View style={styles.dispatchedFooterView}>

        <Text style={styles.footerTextStyle}>{'Dispatched Details'}</Text>
        <Dash style={{width: '100%', height: 1, marginVertical: 5}} dashColor={Colors.rgb_eaeaea} dashGap={0}/>

        {renderOrderFirmTotal('Dispatched Date', formatOrderDate(shipping_date))}
        {renderOrderFirmTotal('Expected Delivery Date', formatOrderDate(expected_delivery_date))}
        {renderOrderFirmTotal('LR No', LR_number)}
        {renderOrderFirmTotal('Bill No', bill_number)}
        {renderOrderFirmTotal('Transport Name', transportation_name)}
        {renderOrderFirmTotal('Notes', notes)}


    </View>;
}

export default DispatchedDetails;

