import React, {Component} from 'react';
import {Text, View,TouchableOpacity,Modal,TextInput,Button} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/CustomerReportsStyles';

import EndlessFlatList from '../../components/EndlessFlatList';
import * as adminActions from '../../actions/adminActions';
import LoadingView from '../../components/LoadingView';
import {Colors, Constants} from '../../Resources';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorScreen from '../../components/ErrorScreen';
import {Strings} from '../../utils/Strings';
import {formatOddReportDate, formatOrderDate} from '../../utils/TextUtils';
import WhatsAppIcon from '@svg/ic_whatsapp';
import CloseIcon from '@svg/icon_close';
import moment from 'moment';
class OddReportsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerReportsList: [],
            isLoading: false,
            spinner: false,
            isApiRunning:false,
            isModalVisible:false,
            rejectReason:'',
            selectedItem:''
        };

        this.pageNumber = 1;
    }

    componentDidMount(): void {
        this.setState({isLoading: true,isApiRunning:true});
        this.callApi()

    }

    callApi(){
        const {requestOddReports} = this.props;

        let json = {
            'page_no': this.pageNumber,
            'offset': Constants.ADMIN.OFFSET_VALUE,
           /* 'sort_by_name': this.nameSort,
            'sort_by_amount': this.numberSort,
            'days': this.weekYearValue,
            'start_date': this.startDate,
            'end_date': this.endDate,*/
        };
        requestOddReports(json);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {isAllOrdersDataFound, customerReportsList, order_id, isModified} = this.props;
        if (customerReportsList != prevProps.customerReportsList && prevState.isApiRunning) {
            if (customerReportsList && customerReportsList.data) {
                const {data} = customerReportsList;
                const {order_data, pagination} = data;
                this.total = pagination.Totalrecords;
                this.setState({
                    isLoading: false,
                    isApiRunning: false,
                    customerReportsList: this.pageNumber > 1 ? prevState.customerReportsList.concat(data.data) : data.data,
                });
            }
        }
    }

    clearFilter() {
        this.weekYearValue = '';
        this.startDate = '';
        this.endDate = '';
        this.nameSort = '';
        this.numberSort = '';
        this.pageNumber = 1;
        this.setState({isLoading: true, isApiRunning: true});
        this.callApi();
    }

    onRefresh() {
        this.pageNumber = 1;

        this.setState({isLoading: true, isApiRunning: true});
        this.callApi();
    }

    _listEmptyComponent = () => {
        return (<ErrorScreen
                image={require('../../Images/assets/reports_empty.png')}
                title={Strings.orders.no_report_found}

            />

        );
    };
renderRejectedOrders(item) {
    return(
        <View style={styles.acceptRejectStyle}>

        {item.is_reject==0 &&
        <TouchableOpacity style={styles.acceptRejectTouchableStyle} onPress={() => {
            this.setState({
                selectedItem:item
            },()=>{
                this.toggleModalVisibility()
            })
            }}>
            <CloseIcon width={20} height={20} style={{marginRight: 10}}/>

            <Text style={styles.acceptRejectTextStyle}>{Strings.orders.reject}</Text>

        </TouchableOpacity>
        }


    </View>
    )
}
rejectOrder(item){
    let data={
        id:item.id,
        reason:this.state.rejectReason
    }
    let response = this.props.rejectOrder(data)
    // console.log(response)
    this.toggleModalVisibility()
    setTimeout(()=>{
        this.callApi()
    },500)
}

toggleModalVisibility=()=> {
    this.setState({
        isModalVisible:!this.state.isModalVisible
    })
}
    renderSubItem(title,message){
        return   <View style={styles.childItemsView}>
            <Text style={[styles.titleView,{flex:0.4,}]}>{title}</Text>
            <Text style={styles.valueView}>{message}</Text>

        </View>
    }
    onShare = async (data) => {
        //  this.getPdfAPI();
        this.props.navigation.navigate("PdfScreen", {
          url: `http://lakshayfabrics.in/api/Reports/oddReportPrintPDF?id=${data.id}&ordernumbers=${data.multi_order_no}`,
        });
      };
    renderItem(item,index){
        const{Firm_name,report_text,create_at}=item
        var dayCounts= moment(create_at,"YYYY-MM-DD");
        var current=moment(moment(),"YYYY-MM-DD");
        var totalDays= moment.duration(current.diff(dayCounts)).asDays()
        console.log(item)
        return <View style={styles.reportsItemStyle}>
            {/*<Text style={styles.firmNameTextStyle}>{Firm_name}</Text>
            <View style={styles.divider}/>*/}
            {this.renderSubItem('Date',formatOddReportDate(create_at))}
            {this.renderSubItem('Odd',report_text)}
           {/* {this.renderSubItem('Total Orders',total_orders)}
            {this.renderSubItem('Contact No',phone)}
            {this.renderSubItem('City',city)}*/}
             {/* Commented WhatsApp functionality */}

            {item.multi_order_no!=null && <TouchableOpacity onPress={()=>this.onShare(item)} style={{position: 'absolute', right: 10,top:10}}>
    <WhatsAppIcon width={20} height={20} fill={Colors.rgb_e15517}/>
</TouchableOpacity>}
            {item.multi_order_no!=null && totalDays < 5 && this.renderRejectedOrders(item)}
        </View>
    }

    close() {
        this.setState({isSortModalVisible: false, isFilterModalVisible: false});
    }

    render() {
        const {isLoading, customerReportsList, isFilterApplied, isSortModalVisible, isFilterModalVisible, spinner,isModalVisible} = this.state;

        if (isLoading) {
            return <LoadingView/>;
        } else {
            return <View style={styles.container}>


                <EndlessFlatList
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={customerReportsList}
                    onSwipeRefresh={() => this.onRefresh()}
                    ListEmptyComponent={this._listEmptyComponent}
                    renderItem={({item, index}) =>this.renderItem(item,index)}
                    loadMore={() => {
                        this.pageNumber++;
                        this.setState({isApiRunning:true})
                        this.callApi()

                    }}
                    loadedAll={customerReportsList.length == 0 ? true : customerReportsList.length >= this.total}
                />


                {spinner && <LoadingSpinner/>}
                <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={this.toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <TextInput placeholder="Enter reason here..." 
                                    value={this.state.rejectReason}
                                   onChangeText={(value) => this.setState({
                                       rejectReason:value
                                   })} />
  
                        {/** This button is responsible to close the modal */}
                        <Button title="Submit" onPress={()=>{
                            this.rejectOrder(this.state.selectedItem)
                        }} />
                    </View>
                </View>
            </Modal>
                {/*<Modal isVisible={isSortModalVisible || isFilterModalVisible} swipeDirection={'down'}
                       style={{justifyContent: 'flex-end', margin: 0}}
                       onSwipeComplete={() => this.close()}>

                    {isFilterModalVisible &&
                    <FilterByDate onPress={() => this.close()} onFilterPress={(weekYearValue, startDate, endDate) => {
                        this.close();
                        this.weekYearValue = weekYearValue;
                        this.startDate = startDate;
                        this.endDate = endDate;

                        if (weekYearValue == undefined && startDate == undefined && endDate == undefined) {
                            return;
                        }

                        this.pageNumber = 1;
                        this.setState({isApiRunning: true, isFilterApplied: true});
                        this.callApi();

                    }}/>
                    }
                    {isSortModalVisible &&
                    <SortByNameAmount onPress={() => this.close()} onFilterPress={(nameSort, numberSOrt) => {
                        this.close();
                        this.nameSort = nameSort;
                        this.numberSort = numberSOrt;
                        if (nameSort == undefined && numberSOrt == undefined) {
                            return;
                        }
                        this.pageNumber = 1;
                        this.setState({isApiRunning: true, isFilterApplied: true});
                        this.callApi(nameSort, numberSOrt);

                    }}/>
                    }
                </Modal>*/}
            </View>;
        }

    }

}


const mapStateToProps = (state) => ({

    customerReportsList: state.adminReducer.customerReportsList,
    errorMessage: state.adminReducer.errorMessage,


});

const mapDispatchToProps = (dispatch) => ({
    requestOddReports: (input) => dispatch(adminActions.requestOddReports(input)),
    rejectOrder:(input)=>dispatch(adminActions.rejectOrderApi(input)),
});


export default connect(mapStateToProps, mapDispatchToProps)(OddReportsScreen);
