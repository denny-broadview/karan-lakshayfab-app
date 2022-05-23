import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/CustomerReportsStyles';

import EndlessFlatList from '../../components/EndlessFlatList';
import * as adminActions from '../../actions/adminActions';
import LoadingView from '../../components/LoadingView';
import {Constants} from '../../Resources';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorScreen from '../../components/ErrorScreen';
import {Strings} from '../../utils/Strings';
import {formatOrderDate} from '../../utils/TextUtils';
import Dash from 'react-native-dash';
import Colors from '../../Resources/Colors';
import SortingHeader from '../../components/SortingHeader';
import ClearFilters from '../../components/ClearFilters';
import Modal from 'react-native-modal';
import {FilterByDate} from '../../components/FilterByDate';
import SortByNameAmount from '../../components/SortByNameAmount';


class DispatchOrdersReportsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerReportsList: [],
            isLoading: false,
            spinner: false,
            isApiRunning:false,
            isSortModalVisible: false,
            stateList: [],
            cityList:[]
        };

        this.pageNumber = 1;
    }

    componentDidMount(): void {
        this.setState({isLoading: true,isApiRunning:true});
        this.callApi()
        this.makeArray()
        this.makeCityArray()

    }

    // Make array sutaible for dropdown
    makeArray() {
        const {stateList} = this.props
        let newArr = []
        let oldArr = []
        // TODO: copy props data to local variable
        oldArr = stateList.message
        
        // TODO: Go through the copy array
        oldArr?.map(item => {
            if(item.address_state != '') {
                newArr.push({
                    label: item.address_state,
                    value: item.address_state
                })
            }
            
        })
        this.setState({stateList: newArr})
        console.log('state list new : ', newArr)
    }

    // Make array suitable for dropdown (city list)
    makeCityArray() {
        const {cityList} = this.props;
        let newArr = []
        let oldArr = []

        // TODO: copy props data to local variable
        oldArr = cityList.message

        // TODO: Go through the copy array
        oldArr.map(item => {
            if(item.address_city != '') {
                newArr.push({
                    label: item.address_city,
                    value: item.address_city
                })
            }
        })
        this.setState({cityList: newArr})
        console.log('CITY LIST 111:: ', newArr)
    }

    callApi(){
        const {requestDispatchReports, navigation, order_id, isModified} = this.props;

        let json = {
            'page_no': this.pageNumber,
            'offset': Constants.ADMIN.OFFSET_VALUE,
            'sort_by_name': this.nameSort,
            'sort_by_amount': this.numberSort,
            'days': this.weekYearValue,
            'start_date': this.startDate,
            'end_date': this.endDate,
            'sort_by_state': this.selectedState,
            'sort_by_city': this.selectedCity
        };
        requestDispatchReports(json);
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
                    customerReportsList: this.pageNumber > 1 ? prevState.customerReportsList.concat(order_data) : order_data,
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
        this.selectedState = '';
        this.selectedCity = '';
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

    renderSubItem(title,message){
        return   <View style={styles.childItemsView}>
            <Text style={styles.titleView}>{title}</Text>
            <Text style={styles.valueView}>{message}</Text>

        </View>
    }

    renderItem(item,index){
        console.log('@@@@ dispat order'+JSON.stringify(item))
        const {Order_number,Firm_name,notes,LR_number,Bill_number,transportation_name,Total,Order_date,Shipment_date}=item
        let order_no=Order_number
        if(order_no.startsWith('#')){
            order_no=order_no.substr(1)
        }

        return <View style={styles.reportsItemStyle}>
            <View style={styles.orderNoView}>
                <Text style={styles.oderNoLabelStyle}>{'Order # '}
                    <Text style={styles.oderNoTextStyle}>{order_no}</Text>
                </Text>

                <Text style={styles.oderNoLabelStyle}>{Total}</Text>
            </View>
            <Dash style={{width: '100%', height: 1,marginBottom:5}} dashColor={Colors.rgb_f7f7f7} dashGap={0}/>

            {this.renderSubItem('Firm Name',Firm_name)}
            {this.renderSubItem('Order Date',formatOrderDate(Order_date))}
            {this.renderSubItem('Dispatch Date',formatOrderDate(Shipment_date))}
            {this.renderSubItem('Transport Name',transportation_name)}
            {this.renderSubItem('LR No',LR_number)}
            {this.renderSubItem('Bill No',Bill_number)}
            {this.renderSubItem('Notes',notes)}

        </View>
    }

    close() {
        this.setState({isSortModalVisible: false, isFilterModalVisible: false});
    }

    render() {
        const {isLoading, customerReportsList, isFilterApplied, isSortModalVisible, isFilterModalVisible, spinner} = this.state;

        if (isLoading) {
            return <LoadingView/>;
        } else {
            return <View style={styles.container}>
                <SortingHeader 
                    title={'Dispatch Orders Reports'} 
                    isWhatsApp={this.state.isFilterApplied}
                    onWhatsAppPress={() => {
                        
                        let day = this.weekYearValue != undefined ? this.weekYearValue : ''
                        let name = this.nameSort != undefined ? this.nameSort : ''
                        let number = this.numberSort != undefined ? this.numberSort : ''
                        let start = this.startDate != undefined ? this.startDate : ''
                        let end = this.endDate != undefined ? this.endDate : ''
                        let newState = this.selectedState != undefined ? this.selectedState : ''
                        let city = this.selectedCity != undefined ? this.selectedCity : ''

                        console.log(day, number, name, start, end, newState)

                        this.props.navigation.navigate('PdfScreen',{url: `https://lakshayfabrics.in/api/reports/DispatchOrdersReportPDF?days=${day}&sort_by_name=${name}&sort_by_amount=${number}&sort_by_state=${newState}&sort_by_city=${city}&start_date=${start}&end_date=${end}`})
                    }} 
                    onSortPress={() => {
                        this.setState({isSortModalVisible: true});
                    }}
                    onFilterPress={() => {
                        this.setState({isFilterModalVisible: true});
                    }}/>


                {isFilterApplied &&
                <ClearFilters clearPress={() => {
                    this.setState({isFilterApplied: false});
                    this.clearFilter();
                }}/>

                }

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

                <Modal isVisible={isSortModalVisible || isFilterModalVisible} swipeDirection={'down'}
                       style={{justifyContent: 'flex-end', margin: 0}}
                       onSwipeComplete={() => this.close()}>

                    {isFilterModalVisible &&
                    <FilterByDate onPress={() => this.close()} onFilterPress={(weekYearValue, startDate, endDate, selectedState,selectedCity) => {
                        this.close();
                        this.weekYearValue = weekYearValue;
                        this.startDate = startDate;
                        this.endDate = endDate;
                        this.selectedState = selectedState
                        this.selectedCity=selectedCity
                     
                        if (weekYearValue == undefined && startDate == undefined && endDate == undefined) {
                            return;
                        }

                        this.pageNumber = 1;
                        this.setState({isApiRunning: true, isFilterApplied: true});
                        this.callApi();
                    }}
                    dropDownData={this.state.stateList}
                     dropDownDataCity={this.state.cityList}
                    />
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
                </Modal>
            </View>;
        }

    }

}


const mapStateToProps = (state) => ({

    customerReportsList: state.adminReducer.customerReportsList,
    errorMessage: state.adminReducer.errorMessage,
    stateList: state.adminReducer.stateList,
    cityList: state.adminReducer.cityList

});

const mapDispatchToProps = (dispatch) => ({
    requestDispatchReports: (input) => dispatch(adminActions.requestDispatchReports(input)),

});


export default connect(mapStateToProps, mapDispatchToProps)(DispatchOrdersReportsScreen);
