import React from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';

import Styles from './Styles/TotalPriceStyles';


function TotalPrice(props) {

    const {
        style,
        press,
        textStyle,
        t1,
        t2,
        t3
    } = props

    return (<TouchableOpacity style={[Styles.minimumItemStyle,style]}  activeOpacity={press!=null ? 0.7: 1} onPress={() => press!=null ?press():null}>
        <Text  allowFontScaling={false} style={[Styles.subTotalTextPriceStyle,textStyle]}>{t1}</Text>
        <Text  allowFontScaling={false}  style={[Styles.subTotalTextPriceStyle,textStyle]}>{t2}</Text>
        <Text  allowFontScaling={false}  style={[Styles.subTotalTextPriceStyle,textStyle]}>{t3}</Text>

    </TouchableOpacity>)

}

export default (TotalPrice)
