import React, {Component} from 'react';
import {ScrollView, View, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';

import {Strings} from '../../utils/Strings';
import Button from '../../components/Button';

import styles from '../Home/styles';
import Header from '../../components/Header';
import * as loginActions from '../../actions/loginActions';
import {Constants} from '../../Resources';
import LoadingView from '../../components/LoadingView';
import EndlessFlatList from '../../components/EndlessFlatList';
import AdminOrderItem from '../../components/AdminOrderItem';
import * as adminActions from '../../actions/adminActions';
import ToastMessage from '../../components/ToastMessage';
import ErrorScreen from '../../components/ErrorScreen';
import * as customerActions from '../../actions/customerActions';


class PendingOrdersScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            isLoading: false,
            isApiRunning: false,
        };

        this.pageNumber = 1;
    }

      componentDidMount() {
        const { navigation} = this.props;
        console.log('--',JSON.stringify(this.props))

        this.unsubscribe = navigation.addListener('focus', async () => {
            this.setState({ isApiRunning: true});
            if (this.state.orderList.length==0){
                this.setState({isLoading: true, isApiRunning: true});
            }

            let data = await this.isUserActive();
            if (data && data.status && data.status == 200) {
                this.getPendingOrdersApi(this.pageNumber, Constants.ADMIN.OFFSET_VALUE);
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

    getPendingOrdersApi(page_no, offset) {
        const {id} = this.props;
        let data = {
            page_no,
            offset,
            'user_id': id,
        };
        console.log('id--',data)
        // this.setState({ spinner:true})
        fetch(Constants.BASE_URL + '/orders/get-pending-orders', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const {status, message, data} = responseJson;
                //this.setState({ spinner: false});
                const {order_data, pagination} = data;
                this.total = pagination.Totalrecords;
                let prevList = this.state.orderList;
                this.setState({
                    isLoading: false,
                    isApiRunning: false,
                    orderList: this.pageNumber > 1 ? prevList.concat(order_data) : order_data,
                });

            })
            .catch((error) => {

                this.setState({isLoading: false, isApiRunning: false});
                ToastMessage(error.message.toString());
            });

    }
    onRefresh(){
        this.pageNumber=1
        this.setState({isLoading: true, isApiRunning: true});
        this.getPendingOrdersApi(this.pageNumber, Constants.ADMIN.OFFSET_VALUE);
    }

    _listEmptyComponent = () => {
        return (<ErrorScreen
                image={require('../../Images/assets/order_empty.png')}
                title={Strings.orders.no_order_found}

            />

        );
    };

    render() {
        const {isLoading, orderList} = this.state;
        const {requestAdminOrders, id} = this.props;


        if (isLoading) {
            return <LoadingView/>;
        } else {
            return <View style={styles.container}>

                <EndlessFlatList
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={orderList}
                    onSwipeRefresh={()=>this.onRefresh()}
                    ListEmptyComponent={this._listEmptyComponent}
                    renderItem={({item, index}) => <AdminOrderItem item={item} index={index}
                                                                   onItemPress={() => this.props.navigation.navigate('CustomerOrderDetailScreen',{
                                                                       order_id:item.id,order_number:item.order_number
                                                                   })}
                                                                   isNewOrders={false} isCustomerOrders={true}
                                                                   onDetailsPress={() => this.props.navigation.navigate('CustomerOrderDetailScreen',{
                                                                       order_id:item.id,order_number:item.order_number
                                                                   })}/>}
                    loadMore={() => {
                        this.pageNumber++;
                        this.setState({isApiRunning: true});
                        this.getPendingOrdersApi(this.pageNumber, Constants.ADMIN.OFFSET_VALUE);
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
    id: state.loginReducer.id,

});

const mapDispatchToProps = (dispatch) => ({
    requestAdminOrders: (page_no, offset, status, userId) => dispatch(adminActions.requestMyOrders(page_no, offset, status, userId)),
    logout: () => dispatch(loginActions.logOut(), customerActions.logOut()),

});

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrdersScreen);
