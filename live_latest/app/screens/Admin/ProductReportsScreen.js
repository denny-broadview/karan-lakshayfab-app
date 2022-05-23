import React, {Component} from 'react';
import {Text, Image,View} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/CustomerReportsStyles';

import EndlessFlatList from '../../components/EndlessFlatList';
import * as adminActions from '../../actions/adminActions';
import LoadingView from '../../components/LoadingView';
import {Constants} from '../../Resources';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorScreen from '../../components/ErrorScreen';
import {Strings} from '../../utils/Strings';
import Dash from 'react-native-dash';
import Colors from '../../Resources/Colors';
import {convertStringToNumber, formatOrderDate, formatString} from '../../utils/TextUtils';
import SortingHeader from '../../components/SortingHeader';
import ClearFilters from '../../components/ClearFilters';
import Modal from 'react-native-modal';
import {FilterByDate} from '../../components/FilterByDate';
import SortByNameAmount from '../../components/SortByNameAmount';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();


class ProductReportsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerReportsList: [],
            isLoading: false,
            spinner: false,
            isApiRunning:false,
            stateList: []
        };

        this.pageNumber = 1;
    }

    componentDidMount(): void {
        this.setState({isLoading: true,isApiRunning:true});
        this.callApi()

    }

    callApi(){
        const {requestProductsReports} = this.props;

        let json = {
            'page_no': this.pageNumber,
            'offset': Constants.ADMIN.OFFSET_VALUE,
            'sort_by_name': this.nameSort,
            'sort_by_amount': this.numberSort,
            'days': this.weekYearValue,
            'start_date': this.startDate,
            'end_date': this.endDate,
            'sort_by_state': this.selectedState
        };
        requestProductsReports(json);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const { customerReportsList} = this.props;
        if (customerReportsList !== prevProps.customerReportsList && prevState.isApiRunning) {
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

    // Make array sutaible for dropdown
    makeArray() {
        const {stateList} = this.props
        let newArr = []
        let oldArr = []
        // TODO: copy props data to local variable
        oldArr = stateList.message
        
        // TODO: Go through the copy array
        oldArr.map(item => {
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

    clearFilter() {
        this.weekYearValue = '';
        this.startDate = '';
        this.endDate = '';
        this.nameSort = '';
        this.numberSort = '';
        this.selectedState = '';
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
        const {catalog_ame,Stock,product_price,Sold,date,color_chart_name,product_image}=item

        let imageUrl
        if (product_image && product_image.length>0){
            imageUrl= formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.product, product_image);
        }


        let price=convertStringToNumber(product_price) *convertStringToNumber(Sold)
        return <View style={styles.reportsItemStyle}>
            <View style={styles.productReportView}>
                {/*<View style={{width:100,height:134,backgroundColor:'red',flex:1}}>

                </View>*/}
                 <Image resizeMode='cover' source={imageUrl?{uri: imageUrl}:require('../../Images/gif/placeholder.gif')}
                   style={{width: 140, height: isTablet? 340:140,flex:1 }}/>

              <View style={{flexDirection:'row',justifyContent: 'space-between',flex:2,marginHorizontal:10}}>
                  <Text style={styles.oderNoLabelStyle}>{catalog_ame}</Text>
                  <Text style={styles.productPriceTextStyle}>{`${Strings.cart.price_symbol}${price}`}</Text>
              </View>

            </View>
            <Dash style={{width: '100%', height: 1,marginBottom:5}} dashColor={Colors.rgb_f7f7f7} dashGap={0}/>

            {this.renderSubItem('Launch Date',formatOrderDate(date))}
            {this.renderSubItem('Sold Out',`${Sold} Orders`)}
            {this.renderSubItem('Colour Chart',color_chart_name)}

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
            return (
              <View style={styles.container}>
                <SortingHeader
                  title={"Product Reports"}
                  onSortPress={() => {
                    this.setState({ isSortModalVisible: true });
                  }}
                  onFilterPress={() => {
                    this.setState({ isFilterModalVisible: true });
                  }}
                />

                {isFilterApplied && (
                  <ClearFilters
                    clearPress={() => {
                      this.setState({ isFilterApplied: false });
                      this.clearFilter();
                    }}
                  />
                )}

                <EndlessFlatList
                  keyExtractor={(item, index) => item.id || index.toString()}
                  data={customerReportsList}
                  onSwipeRefresh={() => this.onRefresh()}
                  ListEmptyComponent={this._listEmptyComponent}
                  renderItem={({ item, index }) => this.renderItem(item, index)}
                  loadMore={() => {
                    this.pageNumber++;
                    this.setState({ isApiRunning: true });
                    this.callApi();
                  }}
                  loadedAll={
                    customerReportsList.length == 0
                      ? true
                      : customerReportsList.length >= this.total
                  }
                />

                {spinner && <LoadingSpinner />}

                <Modal
                  isVisible={isSortModalVisible || isFilterModalVisible}
                  swipeDirection={"down"}
                  style={{ justifyContent: "flex-end", margin: 0 }}
                  onSwipeComplete={() => this.close()}
                >
                  {isFilterModalVisible && (
                    <FilterByDate
                      onPress={() => this.close()}
                      onFilterPress={(
                        weekYearValue,
                        startDate,
                        endDate,
                        selectedState
                      ) => {
                        this.close();
                        this.weekYearValue = weekYearValue;
                        this.startDate = startDate;
                        this.endDate = endDate;
                        this.selectedState = selectedState;

                        if (
                          weekYearValue == undefined &&
                          startDate == undefined &&
                          endDate == undefined
                        ) {
                          return;
                        }

                        this.pageNumber = 1;
                        this.setState({
                          isApiRunning: true,
                          isFilterApplied: true,
                        });
                        this.callApi();
                      }}
                      isFromProduct={true}
                    />
                  )}
                  {isSortModalVisible && (
                    <SortByNameAmount
                      onPress={() => this.close()}
                      onFilterPress={(nameSort, numberSOrt) => {
                        this.close();
                        this.nameSort = nameSort;
                        this.numberSort = numberSOrt;
                        if (nameSort == undefined && numberSOrt == undefined) {
                          return;
                        }
                        this.pageNumber = 1;
                        this.setState({
                          isApiRunning: true,
                          isFilterApplied: true,
                        });
                        this.callApi(nameSort, numberSOrt);
                      }}
                    />
                  )}
                </Modal>
              </View>
            );
        }

    }

}


const mapStateToProps = (state) => ({

    customerReportsList: state.adminReducer.customerReportsList,
    errorMessage: state.adminReducer.errorMessage,
    stateList: state.adminReducer.stateList


});

const mapDispatchToProps = (dispatch) => ({
    requestProductsReports: (input) => dispatch(adminActions.requestProductsReports(input)),

});


export default connect(mapStateToProps, mapDispatchToProps)(ProductReportsScreen);
