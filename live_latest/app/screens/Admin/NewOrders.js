import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/NewOrdersStyles';
import EndlessFlatList from '../../components/EndlessFlatList';
import * as adminActions from '../../actions/adminActions';
import LoadingView from '../../components/LoadingView';
import {Constants} from '../../Resources';
import AdminOrderItem from '../../components/AdminOrderItem';
import ToastMessage from '../../components/ToastMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorScreen from '../../components/ErrorScreen';
import {Strings} from '../../utils/Strings';

class NewOrders extends Component {

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
                requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.NEW);
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
                                   // this.props.navigation.goBack();
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

    onRefresh() {
        const {requestAdminOrders} = this.props;
        this.pageNumber = 1;
        this.setState({isLoading: true, isApiRunning: true});
        requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.NEW);
    }

    _listEmptyComponent = () => {
        return (<ErrorScreen
                image={require('../../Images/assets/order_empty.png')}
                title={Strings.orders.no_order_found}

            />

        );
    };

    render() {
        const {isLoading, orderList, spinner} = this.state;
        const {requestAdminOrders, navigation} = this.props;

        if (isLoading) {
            return <LoadingView/>;
        } else {
            return <View style={styles.container}>

                <EndlessFlatList
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={orderList}
                    onSwipeRefresh={() => this.onRefresh()}
                    ListEmptyComponent={this._listEmptyComponent}
                    renderItem={({item, index}) => <AdminOrderItem

                        onItemPress={() => navigation.navigate('AdminOrderDetailScreen', {
                            order_id: item.id,
                            isNewOrder: true,
                        })}
                        item={item} index={index} isCustomerOrders={false} isNewOrders={true}
                        onAcceptClick={(e) => {
                            this.acceptRejectApi(e, 'Approve',Strings.messages.order_accept_msg);
                        }} onRejectClick={(e) => {
                        this.acceptRejectApi(e, 'Reject',Strings.messages.order_reject_msg);
                    }}
                    />}
                    loadMore={() => {
                        this.pageNumber++;
                        this.setState({isApiRunning: true});
                        requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, 'new');
                    }}
                    loadedAll={orderList.length == 0 ? true : orderList.length >= this.total}
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

});

const mapDispatchToProps = (dispatch) => ({
    requestAdminOrders: (page_no, offset, status) => dispatch(adminActions.requestMyOrders(page_no, offset, status)),

});


export default connect(mapStateToProps, mapDispatchToProps)(NewOrders);
