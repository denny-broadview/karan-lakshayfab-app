import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import { Colors } from '@resources'

import styles from './Styles/SortingHeaderStyles'
import SortIcon from  '@svg/ic_sort'
import FilterIcon from '@svg/ic_filter';
import WhatsAppIcon from '@svg/ic_whatsapp';
import {Title} from 'react-native-paper';


function SortingHeader(props) {
    const {
        disabled,
        t1,
        t2,
        style,
        title,
        onPress,
        textStyles,
        onSortPress,
        onFilterPress,
        isWhatsApp,
        onWhatsAppPress
    } = props

    return (
        <View style={styles.container}>
            <Text style={styles.textStyles}>{title}</Text>
            <View style={{flexDirection:'row'}}>
             {/* Commented WhatsApp functionality */}

                {
                    isWhatsApp && 
                    (
                        <TouchableOpacity style={styles.filterStyle} onPress={()=> onWhatsAppPress()}>
                            <WhatsAppIcon width={20} height={20} fill={Colors.rgb_e15517}/>
                        </TouchableOpacity>        
                    )
                }
                <TouchableOpacity style={styles.filterStyle} onPress={()=>onSortPress()}>
                    <SortIcon width={20} height={20} fill={Colors.rgb_e15517}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterStyle} onPress={()=>onFilterPress()}>
                    <FilterIcon width={20} height={20} fill={Colors.rgb_e15517}/>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SortingHeader
