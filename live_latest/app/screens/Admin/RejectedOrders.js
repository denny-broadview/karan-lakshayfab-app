import React, {Component} from 'react';
import {ScrollView, View, FlatList, Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/ApproveOrdersStyles';
import AdminOrder from '../../components/AdminOrder';
import {Constants} from '../../Resources';
import LoadingView from '../../components/LoadingView';
import EndlessFlatList from '../../components/EndlessFlatList';
import AdminOrderItem from '../../components/AdminOrderItem';
import * as adminActions from '../../actions/adminActions';
import ErrorScreen from '../../components/ErrorScreen';
import {Strings} from '../../utils/Strings';
import ToastMessage from '../../components/ToastMessage';

class RejectedOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            isLoading: false,
            isApiCalled: false,
        };

        this.pageNumber = 1;
    }


    componentDidMount(): void {
        const {requestAdminOrders, navigation} = this.props;

        this.unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            if (this.pageNumber === 1 ) {
                this.setState({isLoading: true, isApiCalled: true});
                requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.REJECT);
            }
        });

    }

    onRefresh(){
        const {requestAdminOrders, navigation} = this.props;
        this.pageNumber=1;
        this.setState({isLoading: true, isApiCalled: true});
        requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.REJECT);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {isAllOrdersDataFound, adminAllOrdersData} = this.props;
        if (adminAllOrdersData && adminAllOrdersData.data && prevState.isApiCalled) {

            const {data} = adminAllOrdersData;
            const {order_data, pagination} = data;
            this.total = pagination.Totalrecords;
            this.setState({
                isLoading: false,
                isApiCalled: false,
                orderList: this.pageNumber > 1 ? prevState.orderList.concat(order_data) : order_data,
            });
        }


    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    _listEmptyComponent = () => {
        return (<ErrorScreen
                image={require('../../Images/assets/order_empty.png')}
                title={Strings.orders.no_order_found}

            />

        );
    };

    acceptRejectApi(item, status,msg) {

        let data = {
            'order_id': item.id,
            'order_status': status,
        };
        this.setState({spinner: true});
        fetch(Constants.BASE_URL + '/orders/update_order_status', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const {status, message} = responseJson;
                this.setState({spinner: false});
                if (status == '200') {

                    Alert.alert(
                        Constants.APP_NAME,
                        msg,
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    this.props.navigation.goBack();
                                },
                                style: 'cancel',
                            },

                        ],
                        {cancelable: false});

                    let orderList = this.state.orderList;
                    let index = orderList.findIndex((e) => {
                        return e.id == item.id;
                    });


                    orderList.splice(index, 1);
                    this.setState({orderList: orderList});

                } else {
                    ToastMessage(message);
                }

            })
            .catch((error) => {

                this.setState({spinner: false});
                ToastMessage(error.message.toString());
            });


    }

    render() {
        const {isLoading, orderList} = this.state;
        const {requestAdminOrders,navigation} = this.props;

        if (isLoading) {
            return <LoadingView/>;
        } else {
            return <View style={styles.container}>

                <EndlessFlatList
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={orderList}
                    onSwipeRefresh={()=>this.onRefresh()}
                    ListEmptyComponent={this._listEmptyComponent}
                    renderItem={({item, index}) => <AdminOrderItem
                        onItemPress={() => navigation.navigate('AdminOrderDetailScreen', {
                            order_id: item.id,
                            order_number: item.order_number,
                            isNewOrder: false,
                            isRejectedOrder:true
                        })}
                        onAcceptClick={(e) => {
                            this.acceptRejectApi(e, 'Approve',Strings.messages.order_accept_msg);
                        }} onRejectClick={(e) => {
                        this.acceptRejectApi(e, 'Reject',Strings.messages.order_reject_msg);
                    }}

                        item={item} index={index} isNewOrders={false} isRejectedOrders={true}
                        isCustomerOrders={false}/>}
                    loadMore={() => {
                        this.pageNumber++;
                        this.setState({isApiCalled: true});
                        requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.REJECT);
                    }}
                    loadedAll={orderList.length >= this.total}
                />
            </View>;
        }

    }

}


const mapStateToProps = (state) => ({
    isAllOrdersDataFound: state.adminReducer.isAllOrdersDataFound,
    adminAllOrdersData: state.adminReducer.adminAllOrdersData,
    errorMessage: state.adminReducer.errorMessage,

});

const mapDispatchToProps = (dispatch) => ({
    requestAdminOrders: (page_no, offset, status) => dispatch(adminActions.requestMyOrders(page_no, offset, status)),
});


export default connect(mapStateToProps, mapDispatchToProps)(RejectedOrders);
