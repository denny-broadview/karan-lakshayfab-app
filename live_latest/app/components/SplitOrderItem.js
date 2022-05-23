import React from 'react';
import {Image, Text,TextInput, TouchableOpacity, View} from 'react-native';
import styles from './Styles/SplitOrderItemStyles';
import {Strings} from '../utils/Strings';
import {formatString} from '../utils/TextUtils';
import {Constants} from '../Resources';
import DeviceInfo from 'react-native-device-info';
import Colors from '../Resources/Colors';
import MinusIcon from '@svg/minus';
import AddIcon from '@svg/add';

const isTablet = DeviceInfo.isTablet();

function SplitOrderItem(props) {

    const {item} = props;
    const {catalog_name, price, qty, product_description, product_image, product_color} = item;
    console.log(item);


    return <View>

        <View style={{flex: 1, flexDirection: 'row',
            justifyContent: 'space-around',

            marginVertical: 10}}>

            <View style={{flex:0.5,}}>

            </View>

           <View style={{flex:2.5,flexDirection: 'row',
               justifyContent: 'space-around',}}>
               <View style={{alignItems: 'center'}}>
                   <Text style={styles.descTextStyle}>{'Dispatch Qty'}</Text>

                   <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>

                       <TouchableOpacity
                           style={{paddingHorizontal: 5}}
                           onPress={() => {

                           }}>
                           <MinusIcon width={23} height={23} fill={Colors.rgb_e15517}/>

                       </TouchableOpacity>
                       <TextInput

                           value={qty}
                           style={styles.plusMinusTextStyle}/>
                       <TouchableOpacity
                           onPress={() => {

                           }}>
                           <AddIcon width={23} height={23} fill={Colors.rgb_e15517}/>

                       </TouchableOpacity>
                   </View>
               </View>


               <View style={{alignItems: 'center',}}>
                   <Text style={styles.descTextStyle}>{'Pending Qty'}</Text>

                   <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>

                       <TouchableOpacity
                           style={{paddingHorizontal: 5}}
                           onPress={() => {

                           }}>
                           <MinusIcon width={23} height={23} fill={Colors.rgb_e15517}/>

                       </TouchableOpacity>
                       <TextInput

                           value={qty}
                           style={styles.plusMinusTextStyle}/>
                       <TouchableOpacity
                           onPress={() => {

                           }}>
                           <AddIcon width={23} height={23} fill={Colors.rgb_e15517}/>

                       </TouchableOpacity>
                   </View>
               </View>

           </View>
        </View>

        <View style={styles.seprator}/>
        <View style={{flexDirection:'row',margin:10}}>
            <View style={{flex:0.5,backgroundColor:'red'}}>
                <Text style={{fontSize:14}}>{'Sub Total'}</Text>

            </View>
            <View style={{flex:2.5,flexDirection: 'row',backgroundColor:'yellow',
                justifyContent: 'space-around',}}>
                <Text style={{fontSize:12,textAlign:'center'}}>{'Rs.20'}</Text>
                <Text style={{fontSize:12,textAlign:'center',}}>{'Rs.20'}</Text>



            </View>

        </View>
        <View style={styles.seprator}/>

    </View>;
}

export default SplitOrderItem;

