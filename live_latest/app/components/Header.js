import React from 'react'
import {
    Text,
    View
} from 'react-native'
import {
    Colors,
    Fonts,
} from '@resources'

import styles from './Styles/HeaderTitleStyles'
import HeaderRight from './HeaderRight';

function Header(props) {
    const{icon,leftHeader,leftIcon}=props
    return (
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:10,backgroundColor:Colors.rgb_e15517}}>
            {leftHeader ? <HeaderRight icon={leftIcon} press={()=>props.pressIcon()!=null?props.pressIcon():null}/> : <Text style={{textAlign:'center',color:Colors.rgb_e15517}}>{'ssss ss'}</Text>}
            <Text style={styles.title}>{props.title}</Text>
            <HeaderRight icon={icon} press={()=>props.pressIcon()!=null?props.pressIcon():null}/>
        </View>
    )
}

export default Header
