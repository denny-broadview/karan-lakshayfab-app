import React, {Component} from 'react';

import {Dimensions, Text, View} from 'react-native';

import {connect} from 'react-redux';

import Modal from 'react-native-modal';

import {Constants} from '../../Resources';
import * as adminActions from '../../actions/adminActions';
import ClearFilters from '../../components/ClearFilters';
import EndlessFlatList from '../../components/EndlessFlatList';
import ErrorScreen from '../../components/ErrorScreen';
import {FilterByDate} from '../../components/FilterByDate';
import LoadingSpinner from '../../components/LoadingSpinner';
import LoadingView from '../../components/LoadingView';
import SortByNameAmount from '../../components/SortByNameAmount';
import SortingHeader from '../../components/SortingHeader';
import {Strings} from '../../utils/Strings';

import styles from './Styles/CustomerReportsStyles';

const height = Dimensions.get('window').height;

class CustomerReportsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerReportsList: [],
            isLoading: false,
            spinner: false,
            isApiRunning: false,
            isSortModalVisible: false,
            stateList: [],
            cityList:[]
        };
        this.nameSort = '';
        this.numberSort = '';
        this.pageNumber = 1;
    }

    componentDidMount(): void {
        this.setState({isLoading: true, isApiRunning: true});
        this.callApi();
        this.makeArray()
        this.makeCityArray()
        //alert(height)

    }

    callApi() {
        const {requestCustomerReports, navigation, order_id, isModified} = this.props;

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
       requestCustomerReports(json);
        // this.getPdfAPI()
    }

    getPdfAPI() {
        fetch('https://lakshayfabrics.in/api/reports/CutomerReportPDF?days=7&sort_by_name=&sort_by_amount=&start_date=&end_date=%27%27&sort_by_state=Gujarat')
        .then(res => res.json())
        .then(resJSON => {
            console.log('JSON RES : ', resJSON)
        })
        .catch(e => {
            console.log('ERROR :: ', e)
        })
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {isAllOrdersDataFound, customerReportsList, order_id, isModified,cityList,stateList} = this.props;
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
        if(prevProps.cityList != cityList){
            this.makeCityArray()
        }
        if(prevProps.stateList != stateList){
            this.makeArray()
        }
        console.log("[# City list data #]",cityList)
    }

    // Make array suitable for dropdown
    makeArray() {
        const {stateList} = this.props
        let newArr = []
        let oldArr = []
        // TODO: copy props data to local variable
        oldArr = stateList?.message,

        
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
        const {stateWiseCity,cityList} = this.props;
        let newArr = []
        let oldArr = []

        // TODO: copy props data to local variable
        console.log('city list : ', stateWiseCity.length)
        // oldArr = stateWiseCity!=[]? stateWiseCity.data: cityList!=[] ? cityList.message :[]
        if(stateWiseCity!=[] && stateWiseCity.length>0 && stateWiseCity!=undefined){
            console.log('stateWiseCity!=[]',stateWiseCity!=[])
            oldArr = stateWiseCity?.data
        }else if(cityList!=[] && cityList!=undefined){
            console.log('cityList!=[]',cityList)
            oldArr= cityList?.message
        }else{
            console.log('##############oldArr',oldArr)
            oldArr = []
        }
        if(oldArr!=[]&& oldArr !=undefined){
            oldArr?.map(item => {
                if(item.address_city != '') {
                    newArr.push({
                        label: item.address_city,
                        value: item.address_city
                    })
                }
            })
        }
        // TODO: Go through the copy array

        this.setState({cityList: newArr})
        console.log('CITY LIST :: ', newArr)
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
        return (
        <ErrorScreen
                image={require('../../Images/assets/reports_empty.png')}
                title={Strings.orders.no_report_found}
        />);
    };

    renderSubItem(title, message) {

        return <View style={styles.childItemsView}>
            <Text style={styles.titleView}>{title}</Text>
            <Text style={styles.valueView}>{message}</Text>
        </View>;
    }

    renderItem(item, index) {
       // console.log('Item', JSON.stringify(item))
        const {customerReportsList}=this.state
        const {name, firm_name, owner_no, total_orders, total_purchased, city, date} = item;
        return <View style={[styles.reportsItemStyle,index===customerReportsList.length-1?{marginBottom:20}:{marginBottom:7}]}>
            {this.renderSubItem('Name', name)}
            {this.renderSubItem('Firm Name', firm_name)}
            {this.renderSubItem('Contact No', owner_no)}
            {this.renderSubItem('Total Orders', total_orders)}
            {this.renderSubItem('Total Purchased', `${Strings.cart.price_symbol} ${total_purchased}`)}
            {this.renderSubItem('City', city)}

        </View>;
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
                <SortingHeader title={'Customer Reports'}
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
                        this.props.navigation.navigate('PdfScreen',{url: `https://lakshayfabrics.in/api/reports/CutomerReportPDF?days=${day}&sort_by_name=${name}&sort_by_amount=${number}&start_date=${start}&end_date=${end}&sort_by_state=${newState}&sort_by_city=${city}`})
                    }} 
                    onSortPress={() => {
                        this.setState({isSortModalVisible: true});
                    }}
                    onFilterPress={() => {
                        this.setState({isFilterModalVisible: true});
                    }}
                />

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
                    renderItem={({item,                index}) => this.renderItem(item, index)}
                    loadMore={() => {
                        this.pageNumber++;
                        this.setState({isApiRunning: true});
                        this.callApi();

                    }}
                    loadedAll={customerReportsList.length === 0 ? true : customerReportsList.length >= this.total}
                />

                {spinner && <LoadingSpinner/>}

                <Modal isVisible={isSortModalVisible || isFilterModalVisible} 
                    swipeDirection={'down'}
                    style={{justifyContent: 'flex-end', margin: 0}}
                    onSwipeComplete={() => this.close()}>

                    {isFilterModalVisible &&
                    <FilterByDate 
                        key={isSortModalVisible}
                        onPress={() => this.close()} 
                        onFilterPress={(weekYearValue, startDate, endDate, selectedState, selectedCity) => {
                            this.close();
                            this.weekYearValue = weekYearValue;
                            this.startDate = startDate;
                            this.endDate = endDate;
                            this.selectedState = selectedState;
                            this.selectedCity = selectedCity;
                            if (weekYearValue == undefined && startDate == undefined && endDate == undefined ) {
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
    cityList:state.adminReducer.cityList,
    stateWiseCity:state.adminReducer.stateWiseCity
});

const mapDispatchToProps = (dispatch) => ({
    requestCustomerReports: (input) => dispatch(adminActions.requestCustomerReports(input)),

});


export default connect(mapStateToProps, mapDispatchToProps)(CustomerReportsScreen);
