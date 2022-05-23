import React,{useState} from 'react';
import { ScrollView,Text,View } from 'react-native';
import { Button } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';
import styles from './styles';

import CartIcon from '@svg/ic_shop_now';
import GalleryIcon from '@svg/ic_gallery';
import AccountIcon from '@svg/ic_account';
import CrmIcon from '@svg/ic_crm';
import ReportIcon from '@svg/ic_report';
import ShippmentIcon from '@svg/ic_shippment';
import OrdersIcon from '@svg/ic_my_order';
import colors from '../../Resources/Colors';
import {Strings} from '../../utils/Strings';
import HomeItem from '../../components/HomeItem';
import {Constants} from '../../Resources';
import Header from '../../components/Header';
export default function Home() {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  const [isAdmin, setIsAdmin] = React.useState(true)


  return (
    <View style={styles.container}>
        <Header title={'Home'} pressIcon={onLogout}/>

      <Button icon="logout" mode="outlined" onPress={onLogout}>
        Logout
      </Button>
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.parentView}>
                    <HomeItem
                        onPress={() => alert('Coming Soon')}
                        title={isAdmin ? Strings.home.orders : Strings.home.shop_now}
                        icon={isAdmin ? <OrdersIcon/> : <CartIcon/>}
                    />
                    <HomeItem
                        onPress={() => alert('Coming Soon')}
                        title={isAdmin ? Strings.home.shipment : Strings.home.my_orders}
                        icon={isAdmin ? <ShippmentIcon/> : <OrdersIcon/>}
                    />
                </View>
                <View style={styles.parentView}>
                    <HomeItem
                        onPress={() => alert('Coming Soon')}
                        title={isAdmin ? Strings.home.crm : Strings.home.product_gallery}
                        icon={isAdmin ? <CrmIcon/> : <GalleryIcon/>}
                    />
                    <HomeItem
                        onPress={() => alert('Coming Soon')}
                        title={isAdmin ? Strings.home.reports : Strings.home.my_account}
                        icon={isAdmin ? <ReportIcon/> : <AccountIcon/>}
                    />

                </View>

            </View>
        </ScrollView>



    </View>
  );
}
