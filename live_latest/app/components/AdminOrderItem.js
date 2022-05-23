import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import LocationIcon from '@svg/icon_location';
import CloseIcon from '@svg/icon_close';
import CheckMarkIcon from '@svg/ic_approve';

import styles from './Styles/AdminOrderItemStyles';
import {Strings} from '../utils/Strings';
import Colors from '../Resources/Colors';
import Dash from 'react-native-dash';
import {calculateTotalPieces, formatDateIN, formatOrderDate} from '../utils/TextUtils';
import WhatsAppIcon from '@svg/ic_whatsapp';

function renderAcceptReject(props) {

    const {onAcceptClick, onRejectClick,isRejectedOrders, item} = props;
    return <View style={styles.acceptRejectStyle}>

        <TouchableOpacity style={styles.acceptRejectTouchableStyle} onPress={() => onAcceptClick(item)}>
            <CheckMarkIcon width={24} height={24} fill={Colors.rgb_green} style={{marginRight: 10}}/>
            <Text style={styles.acceptRejectTextStyle}>{Strings.orders.accept}</Text>

        </TouchableOpacity>

        {!isRejectedOrders &&   <View style={{width: 1, backgroundColor: Colors.rgb_666666}}/>}

        {!isRejectedOrders &&

        <TouchableOpacity style={styles.acceptRejectTouchableStyle} onPress={() => onRejectClick(item)}>
            <CloseIcon width={20} height={20} style={{marginRight: 10}}/>

            <Text style={styles.acceptRejectTextStyle}>{Strings.orders.reject}</Text>

        </TouchableOpacity>
        }


    </View>;
}

function renderOrderFirmTotal(title, message) {
    return <View style={styles.childItemsView}>
        <Text style={styles.titleView}>{title}</Text>
        <Text style={styles.valueView}>{message}</Text>

    </View>;
}



function AdminOrderItem(props) {
    const {item, index, isNewOrders, isRejectedOrders,isCustomerOrders, onDetailsPress, onItemPress, isShippingAddress,isShare,onShare} = props;
    const {order_number, id,create_at, total_pieces,firm_name,order_item,order_total, address_house_no, address_city, address_state, address_landmark, address_zipcode} = item;
    let shareComp= (<TouchableOpacity onPress={onShare} style={{position: 'absolute', right: 10}}>
    <WhatsAppIcon width={20} height={20} fill={Colors.rgb_e15517}/>
</TouchableOpacity>)
    if(isShare){
        shareComp;
    }else{
        shareComp=<View/>
    }
    return (
    <TouchableOpacity style={styles.itemStyle} onPress={() => onItemPress()}>

        <View style={styles.orderNoView}>
            <Text style={styles.oderNoLabelStyle}>{'Order # '}
                <Text style={styles.oderNoTextStyle}>{order_number}</Text>
            </Text>

            <Text style={styles.oderNoLabelStyle}>{isCustomerOrders ? item.status : ' '}</Text>
             {/* Commented WhatsApp functionality */}

            {shareComp}
        </View>
        <Dash style={{width: '100%', height: 1, marginBottom: 5}} dashColor={Colors.rgb_f7f7f7} dashGap={0}/>

        {renderOrderFirmTotal('Order Date', formatDateIN(create_at))}
        {!isCustomerOrders && renderOrderFirmTotal('Firm', firm_name)}
        {renderOrderFirmTotal('Total', `${Strings.cart.price_symbol}${order_total}`)}
        {renderOrderFirmTotal('Total Pieces', `${total_pieces}`)}
        {!isCustomerOrders &&
        <Dash style={{width: '100%', height: 1, marginTop: 5}} dashColor={Colors.rgb_f7f7f7} dashGap={0}/>}

        {isCustomerOrders && <TouchableOpacity style={styles.detailsView} onPress={() => onDetailsPress()}>

            <Text style={styles.detailsTextStyle}>{'Details'}</Text>
        </TouchableOpacity>}

        {!isCustomerOrders && !isShippingAddress && <View style={styles.addressStyle}>
            <LocationIcon width={20} height={20} fill={'black'} style={{marginLeft: 5,flex:1}}/>
            <Text
                style={styles.addressTextStyles}>{`${address_house_no}  ${address_landmark} \n ${address_city}  ${address_state}  ${address_zipcode}`}</Text>
        </View>}


        {(isNewOrders || isRejectedOrders) && renderAcceptReject(props)}

    </TouchableOpacity>);
}

export default AdminOrderItem;

