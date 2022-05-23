import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/LogsScreenstyles';
import LoadingView from '../../components/LoadingView';
import EndlessFlatList from '../../components/EndlessFlatList';
import {Constants} from '../../Resources';
import LoadingSpinner from '../../components/LoadingSpinner';
import * as adminActions from '../../actions/adminActions';
import {Strings} from '../../utils/Strings';
import {formatOrderDate} from '../../utils/TextUtils';


class LogsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceLogsList: '',
            isLoading: false,
            user_id: props.route.params.user_id,
        };
        this.pageNumber = 1;
    }


    componentDidMount(): void {
        const {requestDeviceLogs} = this.props;

        this.setState({isLoading: true});
        requestDeviceLogs(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, this.state.user_id);

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {deviceLogsList, order_id, isModified} = this.props;

        if (deviceLogsList != prevProps.deviceLogsList) {

            if (deviceLogsList && deviceLogsList.data) {
                const {data} = deviceLogsList;
                const {customer_data, pagination} = data;
                this.total = pagination.Totalrecords;

                this.setState({
                    isLoading: false,
                    isApiRunning: false,
                    deviceLogsList: this.pageNumber > 1 ? prevState.deviceLogsList.concat(customer_data) : customer_data,
                });
            }
        }


    }

    renderSubItem(title, message){
        return   <View style={styles.childItemsView}>
            <Text style={styles.titleView}>{title}</Text>
            <Text style={styles.valueView}>{message}</Text>

        </View>
    }

    renderItem(item, index) {

        const {firm_name, name,device_type, device_name,created_at} = item;
        console.log('item----->>',item)
        return <View
            style={[styles.logsItemView, index == this.state.deviceLogsList - 1 ? {marginBottom: 30} : {marginBottom: 7}]}>

            {this.renderSubItem(Strings.logs.customer_name,name)}
            {this.renderSubItem( Strings.logs.device_name,device_name)}
            {this.renderSubItem(Strings.logs.device_type,device_type)}
            {this.renderSubItem(Strings.logs.date,formatOrderDate(created_at))}


        </View>;
    }

    onRefresh() {
        const {requestDeviceLogs} = this.props;
        this.setState({isLoading: true});
        this.pageNumber = 1;
        requestDeviceLogs(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, this.state.user_id);

    }

    render() {
        const {isLoading, deviceLogsList, spinner} = this.state;
        const {requestDeviceLogs, navigation} = this.props;

        if (isLoading) {
            return <LoadingView/>;
        } else {
            return <View style={styles.container}>

                <EndlessFlatList
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={deviceLogsList}
                    onSwipeRefresh={() => this.onRefresh()}
                    ListEmptyComponent={this._listEmptyComponent}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    loadMore={() => {
                        this.pageNumber++;
                        requestDeviceLogs(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, this.state.user_id);
                    }}
                    loadedAll={deviceLogsList.length == 0 ? true : deviceLogsList.length >= this.total}
                />

                {spinner && <LoadingSpinner/>}
            </View>;
        }
    }

}


const mapStateToProps = (state) => ({
    deviceLogsList: state.adminReducer.deviceLogsList,
    errorMessage: state.adminReducer.errorMessage,

});

const mapDispatchToProps = (dispatch) => ({
    requestDeviceLogs: (page_no, offset, user_id) => dispatch(adminActions.requestDeviceLogs(page_no, offset, user_id)),

});


export default connect(mapStateToProps, mapDispatchToProps)(LogsScreen);
