import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/FeedbackStyles';
import LoadingView from '../../components/LoadingView';
import EndlessFlatList from '../../components/EndlessFlatList';
import {Constants} from '../../Resources';
import LoadingSpinner from '../../components/LoadingSpinner';
import * as adminActions from '../../actions/adminActions';
import {Strings} from '../../utils/Strings';
import {formatOrderDate} from '../../utils/TextUtils';
import ToastMessage from '../../components/ToastMessage';
import ErrorScreen from '../../components/ErrorScreen';


class FeedbackListingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceLogsList: '',
            isLoading: false,
            feedbackList:[]
            // user_id: props.route.params.user_id,
        };
        this.pageNumber = 1;
    }


    componentDidMount(): void {
        const {requestDeviceLogs} = this.props;

        this.setState({isLoading: true});
         this.getFeedback()

        //
        //requestDeviceLogs(this.pageNumber, Constants.ADMIN.OFFSET_VALUE, this.state.user_id);

    }


    getFeedback(){
        let body= {
            "page_no" : this.pageNumber,
            "offset" : Constants.ADMIN.OFFSET_VALUE
        }

        this.setState({isLoading:true})
        fetch(Constants.BASE_URL+'/users/list_feedback',{
            method:'POST',
            body:JSON.stringify(body)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({isLoading: false});
                    const {status,message,data}=result
                    console.log(JSON.stringify(result))
                    if (status=='200' || status==200){
                        const {customer_data,pagination}=data
                        this.total=pagination.Totalrecords;
                        let feedbackList=this.state.feedbackList
                        this.setState({
                            feedbackList:this.pageNumber>1?feedbackList.concat(customer_data):customer_data
                        })


                    }else {
                        if (message) {
                            ToastMessage(message);
                        }
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({isLoading: false,});
                    alert(error)
                }
            )
    }


    renderSubItem(title, message){
        return   <View style={styles.childItemsView}>
            <Text style={styles.titleView}>{title}</Text>
            <Text style={styles.valueView}>{message}</Text>

        </View>
    }

    renderItem(item, index) {

        const {feedback, name,device_type, device_name,created_at} = item;
        console.log('item----->>',item)
        return <View
            style={[styles.logsItemView, index == this.state.deviceLogsList - 1 ? {marginBottom: 30} : {marginBottom: 7}]}>

            {this.renderSubItem(Strings.logs.customer_name,name)}
            {this.renderSubItem(Strings.logs.date,formatOrderDate(created_at))}
            {this.renderSubItem( Strings.home.feedback,feedback)}


        </View>;
    }

    onRefresh() {
        this.pageNumber = 1;
        this.getFeedback()

    }

    _listEmptyComponent = () => {
        return (<ErrorScreen
                image={require('../../Images/assets/order_empty.png')}
                title={Strings.orders.no_record_found}

            />

        );
    };

    render() {
        const {isLoading, feedbackList, spinner} = this.state;
        const {requestDeviceLogs, navigation} = this.props;

        if (isLoading) {
            return <LoadingView/>;
        } else {
            return <View style={styles.container}>

                <EndlessFlatList
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={feedbackList}
                    onSwipeRefresh={() => this.onRefresh()}
                    ListEmptyComponent={this._listEmptyComponent}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    loadMore={() => {
                        this.pageNumber++;
                        this.getFeedback()
                    }}
                    loadedAll={feedbackList.length == 0 ? true : feedbackList.length >= this.total}
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


export default connect(mapStateToProps, mapDispatchToProps)(FeedbackListingScreen);
