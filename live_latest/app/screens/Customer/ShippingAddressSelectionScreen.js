import React from 'react';
import {FlatList, Platform, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/ShippingAddressSelectionStyles';
import LoadingView from '../../components/LoadingView';
import * as customerActions from '../../actions/customerActions';
import Colors from '../../Resources/Colors';
import AddIcon from '@svg/add';
import CheckIcon from '@svg/check';

import {Strings} from '../../utils/Strings';
import ToastMessage from '../../components/ToastMessage';
import TotalPrice from '../../components/TotalPrice';
import {calculateTotalPrice, calculateTotalQty} from '../../utils/TextUtils';
import {Constants} from '../../Resources';
import DeviceInfo from 'react-native-device-info';
import * as loginActions from '../../actions/loginActions';


class ShippingAddressSelectionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            addressList: [],
            addressId: '',
        };
    }


    componentDidMount(): void {

        const {navigation} = this.props;
        this._focusListener = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            const {id, requestFetchAddress} = this.props;
            requestFetchAddress(id);
            this.setState({isLoading: true});
        });
        DeviceInfo.getDeviceName().then(deviceName => {

            this.setState({deviceName})
        });

    }

    componentWillUnmount(): void {
        this._focusListener();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {

        const {isShippingAddressFound, isOrderPlaced, orderData, clearCart,listOfAddedAddress, navigation, errorMessage} = this.props;

        if (isShippingAddressFound !== prevProps.isShippingAddressFound && prevState.isLoading) {
            const {status, data} = listOfAddedAddress;
            this.setState({isLoading: false});
            if (status == '200' ) {
                if (data && data.length>0){
                    let add = data.map((e, i) => ({...e, isSelected: i == 0}));
                    this.setState({addressList: add, addressId: add[0].id});
                }else {
                    ToastMessage("No Address Found.")
                }

            } else {
                ToastMessage(errorMessage);
            }
        }

        if (isOrderPlaced !== prevProps.isOrderPlaced) {
            const {status, data} = orderData;



            if (status == '200') {
              //  clearCart()
                navigation.navigate('OrderConfirmationScreen', {
                    orderId: data.order_id,
                });
            } else {
                ToastMessage(errorMessage);
            }
            this.setState({isLoading: false});
        }

    }


    handleSelectedItem(item, index) {
        let address = this.state.addressList;
        address.map((e, i) => {
            return e.isSelected = i == index;
        });
        this.setState({addressList: address,addressId:address[index].id});
    }

    async placeOrder() {
        const {requestOrderPlaced, cartArr, id} = this.props;
        let totalSum = calculateTotalPrice(cartArr);
        let device_id=DeviceInfo.getUniqueId()
        let cartData = {
            'userId': id,
            'totalAmount': totalSum,
            'addressId': this.state.addressId,
            'cartData': cartArr,
            deviceName:this.state.deviceName,
            device_type:Platform.OS,
            device_id:device_id
        };

        this.setState({isLoading: true});
        let data = await this.isUserActive();
        if (data && data.status && data.status == 200) {
            this.callOrderPlaceAPi(cartData)
        } else {
            this.setState({isLoading: false});
            this.props.logout();
        }
    }

    async isUserActive() {
        const {id} = this.props;
        return fetch(Constants.BASE_URL + `/users/authCheck/${id}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                return error;
            });
    }

    callOrderPlaceAPi(dd){
        fetch(Constants.BASE_URL+'/orders/order-place', {
            method: 'POST',
            body:JSON.stringify(dd)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const {status,message}=responseJson;
                this.setState({isLoading: false});
                if (status == '200') {
                     this.props.clearCart()
                    this.props.navigation.navigate('OrderConfirmationScreen', {
                        orderId: responseJson.data.order_id,
                    });

                } else {

                    ToastMessage(message);
                }


            })
            .catch((error) => {

                this.setState({isLoading: false});
                ToastMessage(error.message.toString());
            });


    }


    renderItem(item, index) {
        const {name, address_city, address_state, address_house_no, address_mobile_no, address_zipcode, address_landmark, isSelected} = item;

        return <TouchableOpacity
            style={[styles.shippingItemStyle, isSelected ? {backgroundColor: Colors.rgb_e15517} : {backgroundColor: 'white'}]}
            onPress={() => { this.handleSelectedItem(item, index); }}>

            <View style={{flex: 2}}>

                <Text style={[styles.userNameTextStyle,isSelected ? {color: 'white'} : {color: Colors.rgb_e15517}]}>{name}</Text>
                <Text
                    style={[styles.addressTextStyle,isSelected? {color: 'white'} : {color: Colors.rgb_090909}]}>{address_house_no + ' ' + address_landmark + '\n' + address_city + ' , ' + address_state + ' (' + address_zipcode + ')'}</Text>
                <Text style={[styles.addressTextStyle,isSelected? {color: 'white'} : {color: Colors.rgb_090909}]}>{address_mobile_no}</Text>
            </View>

            <View>

                {isSelected &&
                <CheckIcon width={23} height={23} fill={'white'} style={{flex: 1}}/>
                }

            </View>


        </TouchableOpacity>;
    }

    renderFooterComponent() {
        const {cartArr} = this.props;

        return <View >
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('AddNewAddressScreen');
                }
                }
                style={[styles.shippingItemStyle, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}

            >
                <AddIcon width={23} height={23} fill={Colors.rgb_e15517}/>
                <Text style={styles.addAddressStyle}>{Strings.cart.add_address}</Text>


            </TouchableOpacity>


            <TotalPrice t1={Strings.cart.grand} t3={`${calculateTotalQty(cartArr)}`} press={() =>console.log('press') }/>
            <TotalPrice t1={' '} t3={''} t2={Strings.cart.place_order} press={() => {
                this.placeOrder();

            }}
            />
        </View>;
    }

    render() {
        const {isLoading, addressList} = this.state;

        return <View style={[styles.container,{backgroundColor:'white'}]}>

            {isLoading && <LoadingView/>}
            {!isLoading &&
            <FlatList
                style={{marginTop: 5}}
                keyExtractor={(item, index) => item.id || index.toString()}
                data={addressList}
                renderItem={({item, index}) => this.renderItem(item, index)}
                ListFooterComponent={this.renderFooterComponent()}
            />
            }




        </View>;
    }

}

const mapStateToProps = (state) => ({
    isShippingAddressFound: state.customerReducer.isShippingAddressFound,
    listOfAddedAddress: state.customerReducer.listOfAddedAddress,
    id: state.loginReducer.id,
    cartArr: state.customerReducer.cartArr,
    isOrderPlaced: state.customerReducer.isOrderPlaced,
    orderData: state.customerReducer.orderData,
    errorMessage:state.customerReducer.errorMessage


});

const mapDispatchToProps = (dispatch) => ({
    requestOrderPlaced: (cartData) => dispatch(customerActions.requestOrderPlaced(cartData)),
    requestFetchAddress: (userId) => dispatch(customerActions.requestFetchAddress(userId)),
    clearCart:()=>dispatch(customerActions.clearCart()),
    logout: () => dispatch(loginActions.logOut(), customerActions.logOut()),

});


export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddressSelectionScreen);

