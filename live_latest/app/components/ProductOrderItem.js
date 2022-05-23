import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './Styles/ProductOrderItemStyles';
import {Strings} from '../utils/Strings';
import {formatString} from '../utils/TextUtils';
import {Constants} from '../Resources';
import DeviceInfo from 'react-native-device-info';
import Colors from '../Resources/Colors';
import MinusIcon from '@svg/minus';
import AddIcon from '@svg/add';
import {TextInput} from 'react-native-paper';
import SplitOrderItem from './SplitOrderItem';

const isTablet = DeviceInfo.isTablet();

function ProductOrderItem(props) {

    const {item} = props;
    const {catalog_name, price, qty, fabric_name,product_description, product_image, product_color} = item;

    let imageUrl;
    if (product_image && product_image.length > 0) {
        imageUrl = formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.product, product_image[0].product_image);
    }


    return <View style={styles.productContainerStyle}>
        {props.index === 0 &&
        <Text style={styles.productTitleStyle}>{'Products'}</Text>

        }

        <View style={styles.productItemStyle}>

            <Image resizeMode='cover' source={imageUrl ? {uri: imageUrl} : require('../Images/gif/placeholder.gif')}
                   style={{width: 140, height: isTablet ? 340 : 140, flex: 1.2}}/>

            <View style={styles.productItemContentView}>

                <Text style={styles.productTextTitleStyle}>{catalog_name}</Text>
                <Text style={styles.fabricTextTitleStyle}>{fabric_name}</Text>

                <Text style={styles.productTextTitleStyle}>{product_color}</Text>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginEnd: 5}}>
                    <Text style={styles.totalQtyTextStyle}>{`Total Qty ${qty}`}</Text>
                    <Text style={styles.productTotalPriceTitleStyle}>{`${Strings.cart.price_symbol}${price}`}</Text>
                </View>

                <Text style={styles.descTextStyle}>{product_description}</Text>

            </View>


        </View>
        {/* <SplitOrderItem {...props}/>*/}

    </View>;
}

export default ProductOrderItem;

