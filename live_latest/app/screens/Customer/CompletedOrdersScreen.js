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
import ErrorScreen from '../../components/ErrorScreen';


class CompletedOrdersScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            isLoading: false,
            isApiRunning: false,
        };

        this.pageNumber = 1;
    }

    componentDidMount(): void {
        const {requestAdminOrders, id,navigation} = this.props;
        this.unsubscribe = navigation.addListener('focus', () => {
            this.setState({ isApiRunning: true});
            if (this.state.orderList.length==0){
                this.setState({isLoading: true, isApiRunning: true});
            }
            requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.DELIVERED, id);
        });
    }

    componentWillUnmount(): void {
        this.unsubscribe();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {isAllOrdersDataFound, adminAllOrdersData} = this.props;
        if (adminAllOrdersData != prevProps.adminAllOrdersData && prevState.isApiRunning) {
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

    onRefresh(){
        this.pageNumber=1
        const {requestAdminOrders, id} = this.props;
        this.setState({isLoading: true, isApiRunning: true});
        requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.DELIVERED, id);
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
                        requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.DELIVERED, id);
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

});

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOrdersScreen);
