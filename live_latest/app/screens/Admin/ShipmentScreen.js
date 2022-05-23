import React, {Component} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/ShippmentScreenstyles';

import EndlessFlatList from '../../components/EndlessFlatList';
import * as adminActions from '../../actions/adminActions';
import LoadingView from '../../components/LoadingView';
import {Constants} from '../../Resources';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorScreen from '../../components/ErrorScreen';
import {Strings} from '../../utils/Strings';
import Dash from 'react-native-dash';
import Colors from '../../Resources/Colors';
import {formatOrderDate} from '../../utils/TextUtils';
import Header from '../../components/Header';
import LogoutIcon from '@svg/ic_logout.svg';
import * as loginActions from '../../actions/loginActions';
import * as customerActions from '../../actions/customerActions';


class ShipmentScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            isLoading: false,
            isApiRunning: false,
            spinner: false,
        };

        this.pageNumber = 1;
    }

    componentDidMount(): void {
        const {requestAdminOrders, navigation, order_id, isModified} = this.props;
        this.unsubscribe = navigation.addListener('focus', () => {
            if (this.pageNumber === 1 && this.state.orderList.length === 0) {
                this.setState({isLoading: true, isApiRunning: true});
                requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.APPROVE);
            } else if (isModified && order_id && this.state.orderList.length > 0) {
                let index = this.state.orderList.findIndex((e) => {
                    return e.id === order_id;
                });
                if (index > -1) {
                    let list = this.state.orderList.splice(index, 1);
                    this.setState({orderList: list});
                }


            }
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {isAllOrdersDataFound, adminAllOrdersData, order_id, isModified} = this.props;
        console.log('order_id -----', order_id + '--isModified-' + isModified);

        if (adminAllOrdersData != prevProps.adminAllOrdersData && prevState.isApiRunning) {
            if (adminAllOrdersData && adminAllOrdersData.data) {
                const {data} = adminAllOrdersData;
                const {order_data, pagination} = data;
                this.total = pagination.Totalrecords;
                this.setState({
                    isLoading: false,
                    isApiRunning: false,
                    orderList: this.pageNumber > 1 ? prevState.orderList.concat(order_data) : order_data,
                });
            }
        }
        if (isModified && order_id && this.state.orderList.length > 0) {
            let index = this.state.orderList.findIndex((e) => {
                return e.id === order_id;
            });
            if (index > -1) {
                this.state.orderList.splice(index, 1);
                // this.setState({orderList:list})
            }
        }

    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    onRefresh() {
        const {requestAdminOrders} = this.props;
        this.pageNumber = 1;
        this.setState({isLoading: true, isApiRunning: true});
        requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.APPROVE);

    }

    _listEmptyComponent = () => {
        return (<ErrorScreen
                image={require('../../Images/assets/order.png')}
                title={Strings.orders.no_order_found}
            />

        );
    };

    renderOrderFirmTotal(title, message) {
        return <View style={styles.childItemsView}>
            <Text style={styles.titleView}>{title}</Text>
            <Text style={styles.valueView}>{message}</Text>
        </View>;
    }

    logoutAlert() {

        Alert.alert(Constants.APP_NAME,"Are you sure you want to logout?",[
            {
                text: "Ok",
                onPress: () => {
                 //   onLogout()
                    this.props.onLogout()
                },
                style: "cancel"
            },
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            }

        ],)

    }

    renderItem(item, index) {
        const {order_number, order_total, create_at, name} = item;
        return <TouchableOpacity style={styles.itemStyle}
                                 onPress={() => this.props.navigation.navigate('AdminOrderDetailScreen', {
                                     order_id: item.id,
                                     isNewOrder: false,
                                     isShipped: true,
                                 })}>

            <View style={styles.orderNoView}>
                <Text style={styles.oderNoLabelStyle}>{'Order # '}
                    <Text style={styles.oderNoTextStyle}>{order_number}</Text>
                </Text>

                <Text style={styles.oderNoLabelStyle}>{' '}</Text>
            </View>
            <Dash style={{width: '100%', height: 1, marginBottom: 5}} dashColor={Colors.rgb_f7f7f7} dashGap={0}/>

            {this.renderOrderFirmTotal('Order Date', formatOrderDate(create_at))}
            {this.renderOrderFirmTotal('Firm', name)}

            {this.renderOrderFirmTotal('Total', `${Strings.cart.price_symbol} ${order_total}`)}

            <Dash style={{width: '100%', height: 1, marginTop: 5}} dashColor={Colors.rgb_f7f7f7} dashGap={0}/>

        </TouchableOpacity>;
    }

    render() {
        const {isLoading, orderList, spinner} = this.state;
        const {requestAdminOrders, role} = this.props;

        if (isLoading) {
            return <LoadingView/>;
        } else {
            return <View style={styles.container}>



                <EndlessFlatList
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={orderList}
                    onSwipeRefresh={() => this.onRefresh()}
                    ListEmptyComponent={this._listEmptyComponent}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    loadMore={() => {
                        this.pageNumber++;
                        this.setState({isApiRunning: true});
                        requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.APPROVE);
                    }}
                    loadedAll={orderList.length === 0 ? true : orderList.length >= this.total}
                />

                {spinner && <LoadingSpinner/>}
            </View>;
        }

    }

}


const mapStateToProps = (state) => ({
    isAllOrdersDataFound: state.adminReducer.isAllOrdersDataFound,
    adminAllOrdersData: state.adminReducer.adminAllOrdersData,
    errorMessage: state.adminReducer.errorMessage,
    isModified: state.adminReducer.isModified,
    order_id: state.adminReducer.order_id,
    role:state.loginReducer.role

});

const mapDispatchToProps = (dispatch) => ({
    requestAdminOrders: (page_no, offset, status) => dispatch(adminActions.requestMyOrders(page_no, offset, status)),
    onLogout:()=>dispatch(loginActions.logOut(),customerActions.logOut())

});


export default connect(mapStateToProps, mapDispatchToProps)(ShipmentScreen);
