import React, {createRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Styles/SortByNameAmountStyles';
import CloseIcon from '@svg/ic_rejected';
import SortingIcon from '@svg/ic_Sorting';

import {Strings} from '../utils/Strings';
import TotalPrice from './TotalPrice';
import Colors from '../Resources/Colors';

const handleApplyFilterPress = (props) => {
    props.onFilterPress();
};

const SortByNameAmount = (props) => {
    const [sortNameAscending, SetSortNameAscending] = useState(false);
    const [sortNameDescending, SetSortNameDescending] = useState(false);
    const [sortNumberAscending, SetSortNumberAscending] = useState(false);
    const [sortNumberDescending, SetSortNumberDescending] = useState(false);
    const [sortName, SetSortName] = useState();
    const [sortNumber, SetSortNumber] = useState();
    const {onFilterPress} = props;

    return (
        <View style={styles.container}>

            <View style={styles.sortView}>
                <Text style={styles.sortTextStyle}>{'Sort'}</Text>

                <TouchableOpacity style={styles.acceptRejectTouchableStyle} onPress={() => props.onPress()}>
                    <CloseIcon width={15} height={15} style={{marginRight: 10}} fill={Colors.rgb_e15517}/>

                </TouchableOpacity>
            </View>
            <View style={styles.parent}>

                <View style={styles.divider}/>
                <Text style={styles.sortByNameText}>{'Sort By Name'}</Text>
                <View style={styles.divider}/>

                <View style={styles.nameSortBoxView}>

                    <TouchableOpacity style={[sortNameAscending ? styles.ascendingSelectedView : styles.ascendingView]}
                                      onPress={() => {
                                          SetSortNameAscending(true);
                                          SetSortNameDescending(false);
                                          SetSortName('ASC');
                                      }}>
                        <Text
                            style={[sortNameAscending ? styles.textAscendingSelectedView : styles.textAscendingView]}>{'A'}</Text>
                        <SortingIcon width={15} height={15} style={{marginHorizontal: 5}} fill={Colors.rgb_e15517}/>
                        <Text
                            style={[sortNameAscending ? styles.textAscendingSelectedView : styles.textAscendingView]}>{'Z'}</Text>
                    </TouchableOpacity>

                    <View style={styles.centerDivider}/>

                    <TouchableOpacity
                        style={[sortNameDescending ? styles.ascendingSelectedView : styles.ascendingView]}
                        onPress={() => {
                            SetSortNameAscending(false);
                            SetSortNameDescending(true);
                            SetSortName('DESC');
                        }}>
                        <Text
                            style={[sortNameDescending ? styles.textAscendingSelectedView : styles.textAscendingView]}>{'Z'}</Text>
                        <SortingIcon width={15} height={15} style={{marginHorizontal: 5}} fill={Colors.rgb_e15517}/>
                        <Text
                            style={[sortNameDescending ? styles.textAscendingSelectedView : styles.textAscendingView]}>{'A'}</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.divider}/>
                <Text style={styles.sortByNameText}>{'Sort By Amount'}</Text>
                <View style={styles.divider}/>

                <View style={styles.nameSortBoxView}>
                    <TouchableOpacity
                        style={[sortNumberAscending ? styles.ascendingSelectedView : styles.ascendingView]}
                        onPress={() => {
                            SetSortNumberAscending(true);
                            SetSortNumberDescending(false);
                            SetSortNumber('ASC');
                        }}>
                        <Text
                            style={[sortNumberAscending ? styles.textAscendingSelectedView : styles.textAscendingView]}>{'1'}</Text>
                        <SortingIcon width={15} height={15} style={{marginHorizontal: 5}} fill={Colors.rgb_e15517}/>
                        <Text
                            style={[sortNumberAscending ? styles.textAscendingSelectedView : styles.textAscendingView]}>{'9'}</Text>
                    </TouchableOpacity>
                    <View style={styles.centerDivider}/>

                    <TouchableOpacity
                        style={[sortNumberDescending ? styles.ascendingSelectedView : styles.ascendingView]}
                        onPress={() => {
                            SetSortNumberAscending(false);
                            SetSortNumberDescending(true);
                            SetSortNumber('DESC');
                        }}>
                        <Text
                            style={[sortNumberDescending ? styles.textAscendingSelectedView : styles.textAscendingView]}>{'9'}</Text>
                        <SortingIcon width={15} height={15} style={{marginHorizontal: 5}} fill={Colors.rgb_e15517}/>
                        <Text
                            style={[sortNumberDescending ? styles.textAscendingSelectedView : styles.textAscendingView]}>{'1'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}/>
            </View>

            <TotalPrice
                textStyle={styles.applyFilterTextStyle}
                style={styles.applyFilterStyle} t1={' '} t3={''} t2={Strings.filter.apply_filter} press={() => {
                onFilterPress(sortName, sortNumber);

            }}
            />


        </View>
    );
};

export default SortByNameAmount;
