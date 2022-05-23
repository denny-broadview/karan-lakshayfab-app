import React, {Component} from 'react';
import {ScrollView, View, Image, FlatList, Text, TouchableOpacity, Alert, TextInput,Linking,Platform} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/CRMScreenstyles';
import EditIcon from '@svg/ic_edit';
import BlockIcon from '@svg/ic_block';
import LogsIcon from '@svg/ic_logs';
import Colors from '../../Resources/Colors';
import LoadingView from '../../components/LoadingView';
import EndlessFlatList from '../../components/EndlessFlatList';
import AdminOrderItem from '../../components/AdminOrderItem';
import {Constants} from '../../Resources';
import LoadingSpinner from '../../components/LoadingSpinner';
import * as adminActions from '../../actions/adminActions';
import ToastMessage from '../../components/ToastMessage';
import {Strings} from '../../utils/Strings';
import UserImage from '../../Images/assets/user_profile.png'
import colors from '../../Resources/Colors';
import SearchIcon from '@svg/icon_search';
import WhatsAppIcon from '@svg/ic_whatsapp';
import Share from 'react-native-share'

class CRMScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerList: '',
            isLoading:false,
            searchValue: '',
            searchData: [],
            spinner: false
        };
        this.pageNumber = 1;
    }


    componentDidMount(): void {
        const {requestMyCustomers} = this.props;

        // this.setState({isLoading: true,});
        requestMyCustomers(this.pageNumber, Constants.ADMIN.OFFSET_VALUE);

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {customerList, order_id, isModified} = this.props;

        if (customerList != prevProps.customerList) {
            if (customerList && customerList.data) {
                const {data} = customerList;
                const {customer_data, pagination} = data;
                this.total = pagination.Totalrecords;
                this.setState({
                    isLoading: false,
                    isApiRunning: false,
                    customerList: this.pageNumber > 1 ? prevState.customerList.concat(customer_data) : customer_data,
                });
            }
        }


    }
    showAlertPopup(item,index){

        const {user_status}=item

        let message=user_status!==Strings.block.deactivate?Strings.block.block_msg:Strings.block.unblock_msg;
        Alert.alert(
            Constants.APP_NAME,
            message,
            [
                {
                    text: "Ok",
                    onPress: () => {

                        let userData={
                            "user_id" : item.id,
                            "status" : user_status==Strings.block.deactivate?Strings.block.active:Strings.block.deactivate
                        }

                        this.blockUnblockUser(userData,item,index)
                    },

                },
                {
                    text: "Cancel",
                    onPress: () =>{console.log('cancel')},

                }

            ],
            { cancelable: false })
    }

    blockUnblockUser(dd,item,index){
        console.log('blockData--',dd)
        this.setState({spinner:true})

        fetch(Constants.BASE_URL+'/users/block-customers', {
            method: 'POST',
            body:JSON.stringify(dd)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                
                console.log(responseJson);
                const {status,message}=responseJson;
                if (status == '200') {
                    const {customerList}=this.state
                     customerList[index].user_status=dd.status
                    this.setState({customerList:customerList, spinner: false})
                } else {
                    ToastMessage(message);
                }


            })
            .catch((error) => {

                this.setState({spinner: false});
                ToastMessage(error.message.toString());
            });
            this.setState({spinner: false})

    }

    shareCustomer = async (item) => {
        // console.log('Customer Info :: ', item)
        let message = `Name: ${item.name}, Firm Name: ${item.firm_name}, Address: ${item.address_house_no}, ${item.address_city}, ${item.address_state}, ${item.address_zipcode}, Phone: ${item.owner_no} ,\nGSTIN:${item.gst_no}` 
        const shareOptions = {
            title: 'Share Customer',
            message: message,
            social: Share.Social.WHATSAPP,
        }
       
        if(Platform.OS=='android'){
            const res = await Share.shareSingle(shareOptions)
            console.log('SHARE RESPONSE ::: ', res)
        }else{
            const shareOptions = {
                message: 'Share Customer \n',
                url:message,
                social: Share.Social.WHATSAPP,
              };
            const res = await Share.shareSingle(shareOptions)
            console.log('SHARE RESPONSE ::: ', res)
            // Linking.openURL('https://api.whatsapp.com/send?text='+message)
        }

    }

    renderItem(item, index) {
        if(index==3){
            console.log('item--',item)
        }
        const {firm_name,name,owner_no,user_status,address_house_no,address_city,address_state,_address_landmark,photo,customer_type,gst_no,agency_name}=item
        let image= 'http://lakshayfabrics.in/assets/uploads/users/' + item.photo;

        return (
        <View style={[styles.crmItemView, index == this.state.customerList-1 ? {marginBottom: 30} : {marginBottom: 7}]}>

            <View style={{flexDirection: 'row'}}>

                <Image
                    style={photo?{width:70,height:70,borderRadius:35,marginTop:5}:{width:70,height:70,marginTop:5}}
                    source={photo?{uri:image}:UserImage}
                />

                <View style={{marginHorizontal: 15}}>
                    <View style={{flexDirection:'row'}}>
                        {customer_type=='owner' && <View style={styles.customerTypeStyle}/> }
                        <Text style={styles.titleTextStyle}>{firm_name}</Text>
                    </View>
                    {agency_name && agency_name!='' ?<Text numberOfLines={3} style={styles.addressTextStyle}>{`${agency_name}`}</Text>:null}
                    {gst_no && gst_no!='' ? <Text numberOfLines={3} style={styles.addressTextStyle}>{`${gst_no}`}</Text>:null}
                    <Text numberOfLines={2} style={[styles.addressTextStyle,{width: '65%'}]}>{`${address_house_no}`}</Text>
                    <Text numberOfLines={3} style={styles.addressTextStyle}>{`${address_city} ${address_state}`}</Text>
                    <Text style={styles.addressTextStyle}>{owner_no}</Text>
                </View>
             {/* Commented WhatsApp functionality */}
               
                <TouchableOpacity onPress={() => this.shareCustomer(item)} style={{position: 'absolute', right: 10,}}>
                    <WhatsAppIcon width={20} height={20} fill={Colors.rgb_e15517}/>
                </TouchableOpacity>
                
            </View>

            <View style={styles.headerItemsView}>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('UpdatePersonalDetailsScreen',{
                    user_id:item.id
                })}>
                    <View style={styles.headerItemChildView}>
                        <EditIcon width={15} height={15} fill={Colors.rgb_e15517}/>
                    </View>

                    <Text style={styles.headerItemTextStyle}>{'Edit'}</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.showAlertPopup(item,index)}>
                    <View style={styles.headerItemChildView}>
                        <BlockIcon width={15} height={15} fill={Colors.rgb_e15517}/>
                    </View>

                    <Text style={styles.headerItemTextStyle}>{user_status==Strings.block.deactivate?Strings.block.inactive:Strings.block.active}</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.props.navigation.navigate('LogsScreen',{item,user_id:item.id})}>
                    <View style={styles.headerItemChildView}>
                        <LogsIcon width={15} height={15} fill={Colors.rgb_e15517}/>
                    </View>

                    <Text style={styles.headerItemTextStyle}>{'Logs'}</Text>

                </TouchableOpacity>

            </View>

        </View>);
    }

    onRefresh(){
        const {requestMyCustomers}=this.props
        this.setState({isLoading: true})
        this.pageNumber=1;
        requestMyCustomers(this.pageNumber, Constants.ADMIN.OFFSET_VALUE);
        this.setState({isLoading: false})
    }

    // Search filter
    onSearchFilter(text) {
        this.setState({searchValue: text, isLoading: false})
        let cpData = this.state.customerList
        if (text) {
            let newData = cpData.filter(function (item) {
                const firmName = item.firm_name != null ? item.firm_name.toLowerCase() : ''
                const name = item.name != null ? item.name.toLowerCase() : ''
                if (firmName.includes(text.toLowerCase())) {
                    return firmName.indexOf(text.toLowerCase()) > -1
                } else {
                    return name.indexOf(text.toLowerCase()) > -1
                }
            })
            this.setState({searchData: newData, spinner: false,isLoading: false})
            console.log('NEW DATA : ' + JSON.stringify(newData))
        } else {
            this.setState({searchValue: text, spinner: false,isLoading: false})
            
        }
        
    }

    render() {
        const {isLoading, customerList, spinner, searchValue, searchData} = this.state;
        const {requestMyCustomers, navigation} = this.props;
        console.log('spinner', isLoading)
        if (isLoading == true) {
            return <LoadingView/>;
        } else {
            console.log('here')
            return <View style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <TextInput 
                        style={styles.searchBar} 
                        placeholder='Search Customer Name, Firm Name'
                        placeholderTextColor={colors.rgb_0E0E0E}
                        value={searchValue}
                        onChangeText={text => this.onSearchFilter(text)}
                    />
                    <SearchIcon height={30} width={30} fill={Colors.rgb_e15517} />
                </View>
                <EndlessFlatList
                    keyExtractor={(item, index) => item.id || index.toString()}
                    data={searchValue ? searchData : customerList}
                    onSwipeRefresh={()=>this.onRefresh()}
                    ListEmptyComponent={this._listEmptyComponent}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    loadMore={() => {
                        this.pageNumber++;
                        requestMyCustomers(this.pageNumber, Constants.ADMIN.OFFSET_VALUE);
                    }}
                    loadedAll={customerList.length == 1 ? true : customerList.length >= this.total}
                />

                {spinner && <LoadingSpinner/>}
            </View>;
        }
    }

}


const mapStateToProps = (state) => ({
    customerList: state.adminReducer.customerList,
    errorMessage: state.adminReducer.errorMessage,

});

const mapDispatchToProps = (dispatch) => ({
    requestMyCustomers: (page_no, offset) => dispatch(adminActions.requestMyCustomers(page_no, offset)),

});


export default connect(mapStateToProps, mapDispatchToProps)(CRMScreen);
