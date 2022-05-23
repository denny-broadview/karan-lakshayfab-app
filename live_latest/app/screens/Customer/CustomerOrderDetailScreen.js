import React, {Component} from 'react';
import {FlatList, PermissionsAndroid, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {Strings} from '../../utils/Strings';
import RepeatIcon from '@svg/ic_repeat';
import DownloadIcon from '@svg/ic_download';
import CopyIcon from '@svg/ic_copy';
import styles from './Styles/CustomerOrderDetailStyles';
import LoadingView from '../../components/LoadingView';
import * as adminActions from '../../actions/adminActions';
import {convertStringToNumber, formatDateIN, formatOrderDate} from '../../utils/TextUtils';
import Colors from '../../Resources/Colors';
import ProductOrderItem from '../../components/ProductOrderItem';
import Clipboard from '@react-native-community/clipboard';
import {Constants} from '../../Resources';
import ToastMessage from '../../components/ToastMessage';
import * as customerActions from '../../actions/customerActions';
import DispatchedDetails from '../../components/DispatchedDetails';
import * as loginActions from '../../actions/loginActions';
import Header from '../../components/Header';
import {HeaderBackButton} from '@react-navigation/stack';
import NavigationService from '../../navigation/NavigationService';
import LoadingSpinner from '../../components/LoadingSpinner';


class CustomerOrderDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: '',
            isLoading: true,
        };

        this.pageNumber = 1;
    }

    componentDidMount(): void {
        const {requestMyOrderDetail, navigation, route} = this.props;
        this.unsubscribe = navigation.addListener('focus', async () => {
            this.setState({isLoading: true});
            const {order_id} = route.params;
            let data = await this.isUserActive();
            if (data && data.status && data.status == 200) {
                requestMyOrderDetail(order_id);
            } else {
                this.setState({isLoading: false});
                this.props.logout();
            }

        });

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


    componentWillUnmount(): void {
        this.unsubscribe();
    }


    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {isOrderDetailFound, orderDetailResponse} = this.props;
        if (isOrderDetailFound && orderDetailResponse != prevProps.orderDetailResponse && prevState.isLoading) {
            console.log('AllOrdersData Found--', orderDetailResponse);
            const {data} = orderDetailResponse;
            // const {order_data} = orderDetailResponse.data;
            this.setState({
                isLoading: false,
                orderList: data,
            });
        }
    }

    async requestExternalStorageSavePermission() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Your application Storage Permission',
                message:
                    'Required message',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    downloadPdf(item) {
        if (Platform.OS === 'ios') {
            this.downloadUrl(true, item);
        } else {
            this.requestExternalStorageSavePermission().then((didGetPermission) => {
                this.downloadUrl(didGetPermission, item);

            });
        }
    }

    downloadUrl(didGetPermission, item) {
        const {route} = this.props;
        const {order_id} = route.params;
        if (didGetPermission) {
            fetch(`${Constants.BASE_URL}/orders/orderPDF/${order_id}`, {
                method: 'GET',
                ///  body: JSON.stringify(order_id),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    const {status, message, data} = responseJson;
                    if (status == '200') {
                        this.downloadPdfFromUrl(data[0], item);
                    } else {
                        ToastMessage(message);
                    }


                })
                .catch((error) => {

                    ToastMessage(error.message.toString());
                });
        } else {
            alert('Permission Denied');
        }
    }

    downloadPdfFromUrl(url, item) {
        let dirs = RNFetchBlob.fs.dirs;

        let options={}
        if (Platform.OS=='ios'){
            options = {
                fileCache: true,
                path: dirs.DownloadDir + `/${Constants.APP_NAME}/${item.order_number}.pdf`, // File will be do/your folder/pdfFile.pdfwnloaded in downloads directory
            };
            let stream=RNFetchBlob.fs

         //   stream.writeFile(options.path,url)
            /*stream.writeFile(options.path,url)
                .then((res) => {
                    console.log('The file saved to ', res);
                    ToastMessage('Orders Saved Successfully');
                }).catch((e) => {
                console.log(e);
            });*/

            RNFetchBlob
                .config(options)
                .fetch('GET', url, {
                    //some headers ..
                })
                .then((res) => {
                    console.log('The file saved to ', res.path());
                    Clipboard.setString(res.path());
                    ToastMessage('Orders Saved Successfully');
                }).catch((e) => {
                console.log(e);
            });
        }else {
            options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                    notification: true,
                    appendExt: 'pdf',
                    title: Constants.APP_NAME,
                    path: dirs.DownloadDir + `/${Constants.APP_NAME}/${item.order_number}.pdf`, // File will be do/your folder/pdfFile.pdfwnloaded in downloads directory
                    description: 'Downloading Pdf.',
                },
            };

            RNFetchBlob
                .config(options)
                .fetch('GET', url, {
                    //some headers ..
                })
                .then((res) => {
                    console.log('The file saved to ', res.path());
                    ToastMessage('Orders Saved Successfully');
                }).catch((e) => {
                console.log(e);
            });
        }
        //alert(options.path)



    }

    async copyToClipBoard(item) {
        const {order_total, status, create_at} = item;

        let arr=item.order_item
        let str=''
        arr.forEach((e)=>{
            str=str+`Order Date: ${formatOrderDate(e.create_at)} \nItem Name : ${e.catalog_name} ,${e.product_color} \nQty: ${e.qty}\nAmount: ${Strings.cart.price_symbol} ${e.price} \n\n`
        });

        let price=arr.reduce(function (prev, cur) {
            return prev + Number(cur.price);
        }, 0);

        let totalQty=arr.reduce(function (prev, cur) {
            return prev + Number(cur.qty);
        }, 0);

        str+='Total Items :'+totalQty +'\nGrand Total :'+Strings.cart.price_symbol+price
        console.log(str)
        Clipboard.setString(str);
        const text = await Clipboard.getString();

    }

    addToCart(item) {
        const {route, cartArr} = this.props;

        const {order_item} = item;
        console.log('--', order_item);


        for (let i = 0; i < order_item.length; i++) {
            let singleItem = order_item[i];
            const {catalog_name, product_piece, product_image, product_id, price, product_color, product_price, product_stock, product_min_qty, qty} = singleItem;
            let isExist = false;
            let arr = cartArr == null ? [] : cartArr;
            if (arr.length > 0) {
                isExist = arr.some((e) => {
                    return e.productId == product_id;
                });
            }
            let cartObj = {};
            // cartObj.catalogId = catalog_id;
            cartObj.productId = product_id;
            cartObj.product_color = product_color;
            cartObj.product_price = product_price;
            cartObj.product_min_qty = product_min_qty;
            cartObj.added_piece = convertStringToNumber(qty) - convertStringToNumber(product_min_qty);
            cartObj.totalPrice = price;
            cartObj.catalog_name = catalog_name;
            cartObj.images = product_image;
            cartObj.product_stock = product_stock;
            cartObj.product_piece = product_piece;
            if (!isExist) {
                this.props.storeCartData(cartObj, Constants.CRUD_OPERATION_TYPES.ADD_DATA);
            }else {
                this.props.storeCartData(cartObj, Constants.CRUD_OPERATION_TYPES.UPDATE);
            }
            this.props.navigation.navigate('CartScreen');
            console.log('cartObj----->>');

        }
    }

    renderHeader(orderItem) {
        const {order_total, status, shipping_date, create_at} = orderItem;

        return <View style={styles.headerView}>
            <View style={styles.orderDateView}>
                <Text style={styles.placedDeliveredDateView}>{'Order Date : '}
                    <Text style={styles.oderDateTextStyle}>{formatDateIN(create_at)}</Text>
                </Text>

                <Text style={styles.placedDeliveredDateView}>{`${Strings.cart.price_symbol}${order_total}`}</Text>
            </View>

            {status == Constants.ADMIN.SHIPPED &&
            <Text style={[styles.placedDeliveredDateView, {marginTop: 10}]}>{'Dispatch Date : '}
                <Text style={styles.oderDateTextStyle}>{formatDateIN(shipping_date)}</Text>
            </Text>
            }


            <View style={styles.headerItemsView}>


                <TouchableOpacity onPress={() => {
                    this.copyToClipBoard(orderItem);
                }}>
                    <View style={styles.headerItemChildView}>
                        <CopyIcon width={23} height={23} fill={Colors.rgb_e15517}/>
                    </View>

                    <Text style={styles.headerItemTextStyle}>{'Copy'}</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.downloadPdf(orderItem)}>
                    <View style={styles.headerItemChildView}>
                        <DownloadIcon width={23} height={23} fill={Colors.rgb_e15517} style={{alignSelf: 'center'}}/>
                    </View>

                    <Text style={styles.headerItemTextStyle}>{'Download'}</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    disabled={status != Constants.ADMIN.SHIPPED}
                    onPress={() => {
                        this.addToCart(orderItem);

                    }}>
                    <View style={styles.headerItemChildView}>
                        <RepeatIcon width={23} height={23} fill={Colors.rgb_e15517}/>
                    </View>

                    <Text style={styles.headerItemTextStyle}>{'Repeat'}</Text>

                </TouchableOpacity>

            </View>

        </View>;

    }

    renderFooterComponent(orderItem) {
        console.log(orderItem);
        const {order_number, create_at, LR_number, bill_number, name, purchaser_no, owner_no, address_house_no, address_city, address_state, address_landmark, address_mobile_no, address_zipcode} = orderItem;

        return <View style={{marginBottom: 30}}>

            {(bill_number != null && LR_number != null) && <DispatchedDetails orderItem={orderItem}/>
            }


        </View>;

    }

    render() {
        const {isLoading, orderList} = this.state;
        const {requestAdminOrders} = this.props;
        return <View style={styles.container}>
            <Header
                leftHeader={true}
                title={'My Orders'}
                pressIcon={()=>console.log('ss')}
                leftIcon={<HeaderBackButton
                    {...this.props}
                    labelVisible={false}
                    tintColor={'white'}
                    // style={{backgroundColor: 'white'}}
                    onPress={() => {
                        NavigationService.goBack();
                    }}
                />}

            />

            {isLoading? <LoadingView/>: <FlatList
                keyExtractor={(item, index) => item.id || index.toString()}
                data={orderList.order_item}
                ListHeaderComponent={() => this.renderHeader(orderList)}
                renderItem={({item, index}) => <ProductOrderItem item={item} index={index} isNewOrders={false}
                                                                 isCustomerOrders={true}
                                                                 onDetailsPress={() => alert('ss')}/>}
                ListFooterComponent={() => this.renderFooterComponent(orderList)}

            />}

        </View>;
    }

    /*render() {
        const {isLoading, orderList} = this.state;
        const {requestAdminOrders} = this.props;

        if (isLoading) {
            return <LoadingView/>;
        } else {
            return <View style={styles.container}>

                <FlatList
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={orderList.order_item}
                    ListHeaderComponent={() => this.renderHeader(orderList)}
                    renderItem={({item, index}) => <ProductOrderItem item={item} index={index} isNewOrders={false}
                                                                     isCustomerOrders={true}
                                                                     onDetailsPress={() => alert('ss')}/>}
                    ListFooterComponent={() => this.renderFooterComponent(orderList)}

                />
            </View>;
        }

    }*/

}


const mapStateToProps = (state) => ({
    isOrderDetailFound: state.adminReducer.isOrderDetailFound,
    orderDetailResponse: state.adminReducer.orderDetailResponse,
    errorMessage: state.adminReducer.errorMessage,
    cartArr: state.customerReducer.cartArr,
    id: state.loginReducer.id,

});

const mapDispatchToProps = (dispatch) => ({
    requestMyOrderDetail: (order_id) => dispatch(adminActions.requestMyOrderDetail(order_id)),
    storeCartData: (cartObj, operationType) => dispatch(customerActions.storeCartData(cartObj, operationType)),
    logout: () => dispatch(loginActions.logOut(), customerActions.logOut()),

});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderDetailScreen);
