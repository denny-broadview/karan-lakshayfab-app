import React ,{useEffect,useState}from 'react'
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'

import LogoutIcon from '@svg/ic_logout.svg'
import {
    Colors,
} from '@resources'

import styles from './Styles/HeaderRightStyles'
import {useSelector} from 'react-redux';
import {Constants} from '../Resources';

function HeaderRight(props) {
    const role = useSelector(state => state.loginReducer?.role);
    const cartArr = useSelector(state => state.customerReducer?.cartArr);
    const isCartUpdated = useSelector(state => state.customerReducer?.isCartUpdated);

    //isCartUpdated
    const [cartSize,SetCartSize]=useState(0)


    useEffect(()=>{

        //alert(cartArr)

       console.log('cartArr-->>',cartArr)

        SetCartSize(cartArr==undefined?0:cartArr.length)
    },[cartArr,isCartUpdated])

    if (props.text != undefined) {
        return <Text style={styles.headerRightText}>{props.text}</Text>
    } else {
        const {
            userAudiences,
            search,
            showSearchInScreen,
            press,
            isDisplay,
            counter,
            icon,

        } = props



        return (
            <View style={styles.container}>
               {/* {searchEnabled && <TouchableOpacity style={styles.iconContainer} onPress={() => showSearchInScreen ? showSearchInScreen() :NavigationService.navigate('SearchScreen')}>
                    <SearchIcon fill={Colors.white} width='62.5%' height='62.5%' />
                </TouchableOpacity>}
*/}
                 <TouchableOpacity style={styles.iconContainer} onPress={() => press!=null?press():null}>
                    {icon ?(counter && role == Constants.ROLE.CUSTOMER && cartArr && cartArr.length>0)?<View>
                        {icon}

                        <View style={styles.badgeContainer}>
                            <Text style={styles.badgeText}>{cartArr.length}</Text>

                        </View>
                    </View>:icon:<Text>{'  '}</Text>}



                </TouchableOpacity>
            </View>
        )
    }
}


export default (HeaderRight)
