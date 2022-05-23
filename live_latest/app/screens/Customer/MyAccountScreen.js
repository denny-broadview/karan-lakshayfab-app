import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/MyAccountStyles';
import Colors from '../../Resources/Colors';
import CellIcon from '@svg/ic_person'

import LocationIcon from '@svg/ic_address'
import BreadScrumIcon from '@svg/icon_breadcums';
import PasswordIcon from '@svg/ic_password';

class MyAccountScreen extends React.Component{

    render(){
        const {navigation}=this.props
        return<View style={styles.container}>
            <TouchableOpacity style={styles.updateTextParentView} onPress={()=>navigation.navigate('UpdatePersonalDetailsScreen',{user_id:this.props.id})}>
                <CellIcon width={30} height={30} fill={Colors.rgb_e15517}/>
                <Text style={styles.textStyle}>{'Update Profile'}</Text>
                <BreadScrumIcon width={23} height={23} fill={Colors.rgb_e15517}/>

            </TouchableOpacity>
            <TouchableOpacity style={styles.updateTextParentView} onPress={()=>navigation.navigate('EditShippingAddressSelectionScreen')}>
                <LocationIcon width={30} height={30} fill={Colors.rgb_e15517}/>
                <Text style={styles.textStyle}>{'Update Address'}</Text>
                <BreadScrumIcon width={23} height={23} fill={Colors.rgb_e15517}/>

            </TouchableOpacity>
            <TouchableOpacity style={styles.updateTextParentView} onPress={()=>navigation.navigate('ChangePasswordScreen')}>
                <PasswordIcon width={30} height={30} fill={Colors.rgb_e15517}/>
                <Text style={styles.textStyle}>{'Change Password'}</Text>
                <BreadScrumIcon width={23} height={23} fill={Colors.rgb_e15517}/>
            </TouchableOpacity>

        </View>
    }

}
const mapStateToProps = (state) => ({
    id: state.loginReducer.id,

});
export default connect(mapStateToProps,null)(MyAccountScreen)
