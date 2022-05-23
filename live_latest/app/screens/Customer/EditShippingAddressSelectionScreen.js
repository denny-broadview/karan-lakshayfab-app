import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/ShippingAddressSelectionStyles';
import LoadingView from '../../components/LoadingView';
import * as customerActions from '../../actions/customerActions';
import Colors from '../../Resources/Colors';
import AddIcon from '@svg/add';
import EditIcon from '@svg/ic_edit.svg';

import {Strings} from '../../utils/Strings';
import ToastMessage from '../../components/ToastMessage';


class EditShippingAddressSelectionScreen extends React.Component {
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
        const {addressList}=this.state
        this._focusListener = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            const {id, requestFetchAddress} = this.props;
            requestFetchAddress(id);
            if (addressList.length===0){
                this.setState({isLoading: true});
            }
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
                    this.setState({addressList: data});
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


    renderItem(item, index) {
        const {name, address_city, address_state, address_house_no, address_mobile_no, address_zipcode, address_landmark, isSelected} = item;

        return <TouchableOpacity
            style={[styles.shippingItemStyle,  {backgroundColor: 'white'}]}
            onPress={() => { this.handleSelectedItem(item, index); }}>

            <View style={{flex: 2}}>

                <Text style={[styles.userNameTextStyle, {color: Colors.rgb_e15517}]}>{name}</Text>
                <Text
                    style={[styles.addressTextStyle, {color: Colors.rgb_090909}]}>{address_house_no + ' ' + address_landmark + '\n' + address_city + ' , ' + address_state + ' (' + address_zipcode + ')'}</Text>
                <Text style={[styles.addressTextStyle,{color: Colors.rgb_090909}]}>{address_mobile_no}</Text>
            </View>

            <View>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('UpdateAddressScreen',{
                        addressItem:item
                    })
                }}>

                <EditIcon width={23} height={23} fill={Colors.rgb_e15517} style={{flex: 1}}/>
                </TouchableOpacity>

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

});

const mapDispatchToProps = (dispatch) => ({
    requestFetchAddress: (userId) => dispatch(customerActions.requestFetchAddress(userId)),

});


export default connect(mapStateToProps, mapDispatchToProps)(EditShippingAddressSelectionScreen);

