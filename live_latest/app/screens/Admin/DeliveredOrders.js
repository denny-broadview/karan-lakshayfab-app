import React, {Component} from 'react';
import {ScrollView, View, FlatList, Text} from 'react-native';
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


class DeliveredOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            isLoading: false,
            isApiCall: false,
        };

        this.pageNumber = 1;
    }


    componentDidMount(): void {
        const {requestAdminOrders, navigation} = this.props;
        this.unsubscribe = navigation.addListener('focus', () => {
            if (this.pageNumber === 1 && this.state.orderList.length === 0) {
                this.setState({isLoading: true, isApiCall: true});
                requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.SHIPPED);
            }
        });

    }


    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {isAllOrdersDataFound, adminAllOrdersData} = this.props;
        if (adminAllOrdersData && adminAllOrdersData.data && prevState.isApiCall) {

            const {data} = adminAllOrdersData;
            const {order_data, pagination} = data;
            this.total = pagination.Totalrecords;
            this.setState({
                isLoading: false,
                isApiCall: false,
                orderList: this.pageNumber > 1 ? prevState.orderList.concat(order_data) : order_data,
            });
        }
    }

    onRefresh(){
        const {requestAdminOrders, navigation} = this.props;
        this.pageNumber=1;
        this.setState({isLoading: true, isApiCall: true});
        requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.SHIPPED);

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
                            isApproveOrder:true,
                            isFromApproveOrder:false
                        })}
                        item={item} index={index} isNewOrders={false}
                        isCustomerOrders={false}/>}
                    loadMore={() => {
                        this.pageNumber++;
                        console.log('ss');
                        this.setState({isApiCall: true});
                        requestAdminOrders(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, Constants.ADMIN.SHIPPED);
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveredOrders);
