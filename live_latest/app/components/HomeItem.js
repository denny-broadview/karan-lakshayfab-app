import React, { useState } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './Styles/HomeItemStyles';
import WhatsAppIcon from '@svg/ic_whatsapp'
import CheckIcon from '@svg/check'
import { Colors } from '../Resources';
import DoubleClick from 'react-native-double-tap';
function HomeItem(props) {
    const [isMultiTap,setMultiTap]=useState(false)
    // const []
    const {
        style,
        icon,
        title,
        titleStyle,
        edit,
        isWhatsApp,
        price,
        onLongPress,
        isSelected
    } = props;
    console.log('is selected ', isSelected != undefined && !isSelected )
    return (
        <TouchableOpacity  style={[styles.childView,style,]} onPress={() => props.onPress()} onLongPress={() => onLongPress != undefined ? onLongPress() : null}>
            {edit != undefined && edit}
            {icon != undefined && icon}
            {title != undefined && title != '' ? <Text style={[styles.textStyle,titleStyle]}>{title}</Text> : null}
            { price != undefined && price != '' ? <Text style={[styles.textStyle,{marginTop: 4}]}>{'₹ ' + price}</Text> : null}
            {!isSelected ? <View style={{width: '100%',alignItems: 'center', justifyContent:'flex-end'}}>
             {/* Commented WhatsApp functionality */}
                {isWhatsApp !=undefined && isWhatsApp &&
                <TouchableOpacity style={{position:'absolute', right: 4,}} onPress={() => props.onPressWhatsAppPress()}>
                    <WhatsAppIcon width={24} height={24} />
                </TouchableOpacity>}
            </View>
            :   <View style={{width: '100%',alignItems: 'center', justifyContent:'flex-end'}}>
                {isWhatsApp &&
                    <TouchableOpacity style={{position:'absolute', right: 4, bottom: 4}} onPress={() => props.onPressWhatsAppPress()}>
                        <CheckIcon width={20} height={20} fill={Colors.rgb_e15517} />
                    </TouchableOpacity>}
                </View>
            }
            
            {/* {title && <Text style={[styles.textStyle,titleStyle]}>{title}</Text>} */}
        </TouchableOpacity>
    );
}

export default HomeItem;
