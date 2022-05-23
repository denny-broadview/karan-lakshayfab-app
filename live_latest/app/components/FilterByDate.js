import CloseIcon from '@svg/ic_rejected';
import CalendarIcon from '@svg/ic_calendar';

import React, {useState, useEffect, useMemo, useRef} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';

import moment from 'moment';

import DropDownPicker from 'react-native-dropdown-picker';

import Colors from '../Resources/Colors';
import colors from '../Resources/Colors';
import {Strings} from '../utils/Strings';
import {formatFilterDate, formatOrderDate} from '../utils/TextUtils';

import DateTimePicker from './DateTimePicker';
import TotalPrice from './TotalPrice';

import styles from './Styles/FilterByDateStyles';
import { Dropdown } from 'react-native-material-dropdown'
import { useDispatch, useSelector } from 'react-redux';
import { getStateWiseCitiesList } from '../actions/adminActions';

let filters = [{
    'name': 'This Week',
    'value': 7,
    isSelected: false,
},
    {
        'name': 'This Month',
        'value': 31,
        isSelected: false,
    },
    {
        'name': 'This Year',
        'value': 365,
        isSelected: false,
    }];

let states = [
    {
        label: 'Gujarat',
        value: 'Gujarat'
    },
    {
        label: 'Chennai',
        value: 'Chennai'
    },
    {
        label: 'Mumbai',
        value: 'Mumbai'
    },
]
export function FilterByDate(props) {
    const [showDateTimePicker, SetShowDateTimePicker] = useState(false);
    const [fromDateSelected, SetFromDateSelected] = useState(false);
    const [toDateSelected, SetToDateSelected] = useState(false);

    const [startDate,SetStatrDate]=useState()
    const [endDate,SetEndDate]=useState()

    const [fromDate, SetFromDate] = useState(formatFilterDate(new Date()));
    const [toDate, SetToDate] = useState(formatFilterDate(new Date()));
    const [filtersItem, SetFiltersItem] = useState(filters);
    const [week, SetWeek] = useState(false);
    const [weekYearValue, SetWeekYearValue] = useState();
    const [year, SetYear] = useState(false);
    const [month, SetMonth] = useState(false);
    const [isFromDateFilter, SetIsFromDateFilter] = useState(false);
    const [sortNumber, SetSortNumber] = useState();
    const [selectedState, setSelectedState] = useState('')
    const {onFilterPress, dropDownData,dropDownDataCity, isFromProduct} = props;
    const [selectedCity, setSelectedCity] = useState('')
    const [isStateSelected, setIsStateSelected] = useState(false)
    const [isCitySelected, setIsCitySelected] = useState(false)
    const [allcities,setCities]=useState([])
    const dispatch=useDispatch()
    const cities = useSelector(state => state.adminReducer.stateWiseCity)
    const prevCountRef = useRef();
    let today = new Date();
    let maximumDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    const handleSelectedDate = (date) => {
        let dd = formatFilterDate(date);
        if (isFromDateFilter){
            SetStatrDate(dd)
            SetFromDate(dd)
        }else {
            SetEndDate(dd)
            SetToDate(dd)
        }

    };

    const handleCancelPicker = () => {
    };
    async function getCityStateWIse(val){
        console.log(val)
    const data = await dispatch(getStateWiseCitiesList(val))
    console.log('data of cityies###',allcities)
}
    useEffect(() => {
        
        // Update the document title using the browser API
       
       let newCities = [];
       newCities=cities!=''? cities?.data:[];
       newCities?.map((item,index)=>{
           item.label=item.address_city,
           item.value=item.address_city
           return item
        })
        setCities(newCities)
      
        console.log(allcities)
    },[cities]);
    return (
        <View style={styles.container}>

            <DateTimePicker visible={showDateTimePicker}
                            handleConfirm={(clickedDate) => {
                                let dd = moment(clickedDate).format('YYYY-MM-DD');
                                handleSelectedDate(dd);

                            }}
                            cancelPicker={handleCancelPicker}
                            value={maximumDate}
                            maximumDate={today}
                            hideDatePicker={(status) => {
                                SetShowDateTimePicker(status);
                            }}/>

            <View style={styles.sortView}>
                <Text style={styles.sortTextStyle}>{'Filters'}</Text>

                <TouchableOpacity style={styles.acceptRejectTouchableStyle} onPress={() => {
                    props.onPress()
                    // setIsStateSelected(false)
                }}>
                    <CloseIcon width={15} height={15} style={{marginRight: 10}} fill={Colors.rgb_e15517}/>

                </TouchableOpacity>
            </View>

            <View style={styles.parentView}>
                <View style={styles.divider}/>
                <Text
                    style={[styles.filterByWeekMonth, week ? {color: Colors.rgb_e15517} : {color: Colors.rgb_000000}]}
                    onPress={() => {
                        SetWeek(true);
                        SetMonth(false);
                        SetYear(false);
                        SetWeekYearValue(7);
                    }}>{'This Week'}</Text>
                <View style={styles.divider}/>
                <Text
                    style={[styles.filterByWeekMonth, month ? {color: Colors.rgb_e15517} : {color: Colors.rgb_000000}]}
                    onPress={() => {
                        SetWeek(false);
                        SetMonth(true);
                        SetYear(false);
                        SetWeekYearValue(31);

                    }}>{'This Month'}</Text>
                <View style={styles.divider}/>
                <Text
                    style={[styles.filterByWeekMonth, year ? {color: Colors.rgb_e15517} : {color: Colors.rgb_000000}]}
                    onPress={() => {
                        SetWeek(false);
                        SetMonth(false);
                        SetYear(true);
                        SetWeekYearValue(365);
                    }}>{'This Year'}</Text>
                <View style={styles.divider}/>
                {!isFromProduct && <View style={{flexDirection: 'row', alignItems:'center',paddingVertical: 6, zIndex: 100}}>
                    <Text style={[styles.filterByWeekMonth, year ? {color: Colors.rgb_e15517} : {color: Colors.rgb_000000}]}>{'State'}</Text>
                    {/* <DropDownPicker
                        zIndex={1000}
                        items={dropDownData}
                        defaultValue={selectedState}
                        placeholder="Select State"
                        containerStyle={{height: 40}}
                        style={[styles.dropDownContainer,{borderColor: colors.rgb_b9b9b9}]}
                        labelStyle={styles.dropDownItemStyle}
                        arrowContainerView={styles.arrowContainerView}
                        arrowSize={22}
                        arrowColor={colors.rgb_b9b9b9}
                        placeholderStyle={styles.placeholderStyle}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={(item,index) => {
                            setSelectedState(item.value)
                            // this.setState({month: item.value});
                            // this.getProductsGallery(index+1);
                        }}
                        listMode={'MODAL'}
                    /> */}
                    <Dropdown
                        // disabled={isCitySelected ? true : false }
                        onPress={()=>{
                            alert()
                        }}
                        data={dropDownData}
                        labelTextStyle={{fontSize: 0}}
                        label='Select State'                        
                        useNativeDriver={true}
                        containerStyle={{width: 200,padding: 6}}
                        onChangeText={(val) => {
                            
                            console.log(val)
                            setSelectedState(val)
                            getCityStateWIse(val)
                            // setIsStateSelected(true)
                            // setIsCitySelected(false)
                        }}

                    />
                </View>}
                <View style={styles.divider}/>
                {!isFromProduct && <View style={{flexDirection: 'row', alignItems:'center',paddingVertical: 6, zIndex: 100}}>
                    <Text style={[styles.filterByWeekMonth, year ? {color: Colors.rgb_e15517} : {color: Colors.rgb_000000}]}>{'City'}</Text>
                    {/* <DropDownPicker
                        zIndex={1000}
                        items={dropDownData}
                        defaultValue={selectedState}
                        placeholder="Select State"
                        containerStyle={{height: 40}}
                        style={[styles.dropDownContainer,{borderColor: colors.rgb_b9b9b9}]}
                        labelStyle={styles.dropDownItemStyle}
                        arrowContainerView={styles.arrowContainerView}
                        arrowSize={22}
                        arrowColor={colors.rgb_b9b9b9}
                        placeholderStyle={styles.placeholderStyle}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={(item,index) => {
                            setSelectedState(item.value)
                            // this.setState({month: item.value});
                            // this.getProductsGallery(index+1);
                        }}
                        listMode={'MODAL'}
                    /> */}
                    <Dropdown 
                        // disabled={isStateSelected ? true : false }
                        data={allcities}
                        ref={prevCountRef}
                        labelTextStyle={{fontSize: 0}}
                        label='Select City'                        
                        useNativeDriver={true}
                        containerStyle={{width: 200,padding: 6}}
                        onChangeText={(val) => {
                            setSelectedCity(val)
                            // setIsStateSelected(false)
                            // setIsCitySelected(true)
                        }}
                    />
                </View>}
                
                <View style={styles.divider}/>

                <View style={styles.dateRangeView}>
                    <View>
                        <Text style={styles.filterByWeekMonth}>{'From'}</Text>

                        <TouchableOpacity style={styles.calendarView} onPress={() => {
                            SetShowDateTimePicker(true);
                            SetFromDateSelected(true);
                            SetIsFromDateFilter(true)
                        }}>
                            <CalendarIcon width={20} height={20} style={{marginRight: 10}} fill={Colors.rgb_e15517}/>
                            <Text>{fromDate}</Text>

                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.filterByWeekMonth}>{'To'}</Text>

                        <TouchableOpacity style={styles.calendarView} onPress={() => {
                            SetShowDateTimePicker(true);
                            SetToDateSelected(true);
                            SetIsFromDateFilter(false)
                        }}>
                            <CalendarIcon width={20} height={20} style={{marginRight: 10}} fill={Colors.rgb_e15517}/>
                            <Text>{toDate}</Text>

                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            
            <View style={{zIndex: -1}}>
            <TotalPrice
                textStyle={styles.applyFilterTextStyle}
                style={[styles.applyFilterStyle,{zIndex: -1}]} t1={' '} t3={''} t2={Strings.filter.apply_filter} press={() => {

                onFilterPress(weekYearValue, startDate, endDate, selectedState, selectedCity);
               
            }}
            />
            </View>


        </View>
    );
};
